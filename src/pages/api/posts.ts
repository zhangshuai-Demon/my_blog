import type { APIRoute } from 'astro';
import { listPosts, savePost } from '../../lib/posts';
import type { PostData } from '../../lib/posts';

// GET /api/posts — 列出所有文章
export const GET: APIRoute = async () => {
  try {
    const posts = await listPosts();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = (err as Error).message;
    console.error('[api:posts:GET]', msg);
    return new Response(
      JSON.stringify({ error: msg, detail: import.meta.env.DEV ? (err as Error).stack : undefined }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST /api/posts — 创建或更新文章
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { slug, ...postData } = body as PostData & { slug: string };

    if (!slug || !postData.title) {
      return new Response(
        JSON.stringify({ error: 'slug 和 title 为必填项' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 确保 slug 安全（只允许字母、数字、连字符、中文）
    const safeSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9一-鿿-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    await savePost(safeSlug, postData);

    return new Response(
      JSON.stringify({ ok: true, slug: safeSlug }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const msg = (err as Error).message;
    console.error('[api:posts:POST]', msg);
    return new Response(
      JSON.stringify({ error: msg, detail: import.meta.env.DEV ? (err as Error).stack : undefined }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
