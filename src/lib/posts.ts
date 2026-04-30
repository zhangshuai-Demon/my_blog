import fs from 'node:fs';
import path from 'node:path';

// 使用项目根目录而非 import.meta.url，避免 Astro 编译后路径偏移
const PROJECT_ROOT = process.cwd();
const BLOG_DIR = path.resolve(PROJECT_ROOT, 'src/content/blog');

// ─── 环境检测 ───
const isDev = import.meta.env.DEV;
const isProd = !isDev;

// 调试用：首次加载时输出路径信息
if (isDev) {
  console.log('[posts] 项目根目录:', PROJECT_ROOT);
  console.log('[posts] 文章目录:', BLOG_DIR);
  console.log('[posts] 目录存在:', fs.existsSync(BLOG_DIR));
}

// ─── 类型 ───
export interface PostData {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  draft: boolean;
  body: string;
}

export interface PostListItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
}

// ─── 辅助：解析 frontmatter ───
function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    // 没有 frontmatter，当做纯正文
    return { frontmatter: {}, body: raw.trim() };
  }

  const frontmatterRaw = match[1];
  const body = match[2].trim();

  const frontmatter: Record<string, unknown> = {};
  for (const line of frontmatterRaw.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // 去掉引号
    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // 解析数组 [a, b, c]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''));
    }

    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

// ─── 辅助：生成 frontmatter 字符串 ───
function buildFrontmatter(data: PostData): string {
  const lines: string[] = ['---'];
  lines.push(`title: "${data.title}"`);
  lines.push(`date: ${data.date}`);
  if (data.description) lines.push(`description: "${data.description}"`);
  if (data.tags.length > 0) {
    lines.push(`tags: [${data.tags.map((t) => `"${t}"`).join(', ')}]`);
  }
  lines.push(`draft: ${data.draft}`);
  lines.push('---');
  lines.push('');
  lines.push(data.body);
  return lines.join('\n') + '\n';
}

// ─── 本地存储：文件系统 ───
function localSavePost(slug: string, data: PostData): void {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const content = buildFrontmatter(data);
  fs.writeFileSync(filePath, content, 'utf-8');
}

function localListPosts(): PostListItem[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const { frontmatter, body } = parseFrontmatter(raw);

      return {
        slug,
        title: String(frontmatter.title || slug),
        description: String(frontmatter.description || body.slice(0, 150)),
        date: String(frontmatter.date || ''),
        tags: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
        draft: frontmatter.draft === true || frontmatter.draft === 'true',
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function localGetPost(slug: string): PostData | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(raw);

  return {
    title: String(frontmatter.title || slug),
    description: String(frontmatter.description || ''),
    date: String(frontmatter.date || new Date().toISOString().slice(0, 10)),
    tags: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
    draft: frontmatter.draft === true || frontmatter.draft === 'true',
    body,
  };
}

function localDeletePost(slug: string): boolean {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}

// ─── GitHub API 存储 ───
function getGitHubConfig() {
  const token = import.meta.env.GITHUB_TOKEN;
  const repo = import.meta.env.GITHUB_REPO; // e.g. "username/my-blog"
  const branch = import.meta.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    throw new Error('GitHub API 未配置：请设置 GITHUB_TOKEN 和 GITHUB_REPO 环境变量');
  }

  return { token, repo, branch };
}

async function githubApi(
  method: string,
  endpointPath: string,
  body?: Record<string, unknown>
): Promise<unknown> {
  const { token, repo } = getGitHubConfig();
  const url = `https://api.github.com/repos/${repo}/contents${endpointPath}`;

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`GitHub API error (${response.status}): ${(err as { message?: string }).message}`);
  }

  return response.json();
}

async function githubSavePost(slug: string, data: PostData): Promise<void> {
  const { branch } = getGitHubConfig();
  const filePath = `src/content/blog/${slug}.md`;
  const content = buildFrontmatter(data);
  const base64Content = Buffer.from(content).toString('base64');

  // 先尝试获取文件 SHA（用于更新）
  let sha = '';
  try {
    const existing = (await githubApi('GET', `/${filePath}`)) as { sha?: string };
    sha = existing.sha || '';
  } catch {
    // 文件不存在，这是新建
  }

  const payload: Record<string, unknown> = {
    message: `📝 Update: ${data.title}`,
    content: base64Content,
    branch,
  };
  if (sha) payload.sha = sha;

  await githubApi('PUT', `/${filePath}`, payload);
}

async function githubListPosts(): Promise<PostListItem[]> {
  const dirs = (await githubApi('GET', '/src/content/blog')) as Array<{
    name: string;
    type: string;
    download_url: string;
  }>;

  if (!Array.isArray(dirs)) return [];

  const mdFiles = dirs.filter((f) => f.name.endsWith('.md'));
  const posts: PostListItem[] = [];

  for (const file of mdFiles) {
    try {
      const response = await fetch(file.download_url);
      const raw = await response.text();
      const { frontmatter, body } = parseFrontmatter(raw);
      posts.push({
        slug: file.name.replace(/\.md$/, ''),
        title: String(frontmatter.title || file.name),
        description: String(frontmatter.description || body.slice(0, 150)),
        date: String(frontmatter.date || ''),
        tags: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
        draft: frontmatter.draft === true || frontmatter.draft === 'true',
      });
    } catch {
      // skip unreadable files
    }
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

async function githubGetPost(slug: string): Promise<PostData | null> {
  try {
    const file = (await githubApi('GET', `/src/content/blog/${slug}.md`)) as {
      content?: string;
      encoding?: string;
    };

    if (!file.content || file.encoding !== 'base64') return null;
    const raw = Buffer.from(file.content, 'base64').toString('utf-8');
    const { frontmatter, body } = parseFrontmatter(raw);

    return {
      title: String(frontmatter.title || slug),
      description: String(frontmatter.description || ''),
      date: String(frontmatter.date || new Date().toISOString().slice(0, 10)),
      tags: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
      draft: frontmatter.draft === true || frontmatter.draft === 'true',
      body,
    };
  } catch {
    return null;
  }
}

async function githubDeletePost(slug: string): Promise<boolean> {
  try {
    const { branch } = getGitHubConfig();
    const filePath = `src/content/blog/${slug}.md`;
    const existing = (await githubApi('GET', `/${filePath}`)) as { sha: string };
    await githubApi('DELETE', `/${filePath}`, {
      message: `🗑 Delete: ${slug}`,
      sha: existing.sha,
      branch,
    });
    return true;
  } catch {
    return false;
  }
}

// ─── 统一导出接口（自动判断环境）────
export function savePost(slug: string, data: PostData): void | Promise<void> {
  if (isDev) return localSavePost(slug, data);
  return githubSavePost(slug, data);
}

export function listPosts(): PostListItem[] | Promise<PostListItem[]> {
  if (isDev) return localListPosts();
  return githubListPosts();
}

export function getPost(slug: string): PostData | null | Promise<PostData | null> {
  if (isDev) return localGetPost(slug);
  return githubGetPost(slug);
}

export function deletePost(slug: string): boolean | Promise<boolean> {
  if (isDev) return localDeletePost(slug);
  return githubDeletePost(slug);
}
