import nodePath from 'node:path';

const PROJECT_ROOT = process.cwd();
nodePath.resolve(PROJECT_ROOT, "src/content/blog");
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw.trim() };
  }
  const frontmatterRaw = match[1];
  const body = match[2].trim();
  const frontmatter = {};
  for (const line of frontmatterRaw.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
    frontmatter[key] = value;
  }
  return { frontmatter, body };
}
function buildFrontmatter(data) {
  const lines = ["---"];
  lines.push(`title: "${data.title}"`);
  lines.push(`date: ${data.date}`);
  if (data.description) lines.push(`description: "${data.description}"`);
  if (data.tags.length > 0) {
    lines.push(`tags: [${data.tags.map((t) => `"${t}"`).join(", ")}]`);
  }
  lines.push(`draft: ${data.draft}`);
  lines.push("---");
  lines.push("");
  lines.push(data.body);
  return lines.join("\n") + "\n";
}
function getGitHubConfig() {
  {
    throw new Error("GitHub API 未配置：请设置 GITHUB_TOKEN 和 GITHUB_REPO 环境变量");
  }
}
async function githubApi(method, endpointPath, body) {
  const { token, repo } = getGitHubConfig();
  const url = `https://api.github.com/repos/${repo}/contents${endpointPath}`;
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : void 0
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`GitHub API error (${response.status}): ${err.message}`);
  }
  return response.json();
}
async function githubSavePost(slug, data) {
  const { branch } = getGitHubConfig();
  const filePath = `src/content/blog/${slug}.md`;
  const content = buildFrontmatter(data);
  const base64Content = Buffer.from(content).toString("base64");
  let sha = "";
  try {
    const existing = await githubApi("GET", `/${filePath}`);
    sha = existing.sha || "";
  } catch {
  }
  const payload = {
    message: `📝 Update: ${data.title}`,
    content: base64Content,
    branch
  };
  if (sha) payload.sha = sha;
  await githubApi("PUT", `/${filePath}`, payload);
}
async function githubListPosts() {
  const dirs = await githubApi("GET", "/src/content/blog");
  if (!Array.isArray(dirs)) return [];
  const mdFiles = dirs.filter((f) => f.name.endsWith(".md"));
  const posts = [];
  for (const file of mdFiles) {
    try {
      const response = await fetch(file.download_url);
      const raw = await response.text();
      const { frontmatter, body } = parseFrontmatter(raw);
      posts.push({
        slug: file.name.replace(/\.md$/, ""),
        title: String(frontmatter.title || file.name),
        description: String(frontmatter.description || body.slice(0, 150)),
        date: String(frontmatter.date || ""),
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        draft: frontmatter.draft === true || frontmatter.draft === "true"
      });
    } catch {
    }
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
async function githubGetPost(slug) {
  try {
    const file = await githubApi("GET", `/src/content/blog/${slug}.md`);
    if (!file.content || file.encoding !== "base64") return null;
    const raw = Buffer.from(file.content, "base64").toString("utf-8");
    const { frontmatter, body } = parseFrontmatter(raw);
    return {
      title: String(frontmatter.title || slug),
      description: String(frontmatter.description || ""),
      date: String(frontmatter.date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      draft: frontmatter.draft === true || frontmatter.draft === "true",
      body
    };
  } catch {
    return null;
  }
}
async function githubDeletePost(slug) {
  try {
    const { branch } = getGitHubConfig();
    const filePath = `src/content/blog/${slug}.md`;
    const existing = await githubApi("GET", `/${filePath}`);
    await githubApi("DELETE", `/${filePath}`, {
      message: `🗑 Delete: ${slug}`,
      sha: existing.sha,
      branch
    });
    return true;
  } catch {
    return false;
  }
}
function savePost(slug, data) {
  return githubSavePost(slug, data);
}
function listPosts() {
  return githubListPosts();
}
function getPost(slug) {
  return githubGetPost(slug);
}
function deletePost(slug) {
  return githubDeletePost(slug);
}

export { deletePost as d, getPost as g, listPosts as l, savePost as s };
