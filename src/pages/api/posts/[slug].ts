import type { APIRoute } from 'astro';
import { getPost, deletePost } from '../../../lib/posts';

// GET /api/posts/:slug — 获取单篇文章（编辑用）
export const GET: APIRoute = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'slug 缺失' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const post = await getPost(slug);
    if (!post) {
      return new Response(
        JSON.stringify({ error: '文章不存在' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ slug, ...post }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = (err as Error).message;
    console.error('[api:posts:slug:GET]', msg);
    return new Response(
      JSON.stringify({ error: msg, detail: import.meta.env.DEV ? (err as Error).stack : undefined }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// DELETE /api/posts/:slug — 删除文章
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'slug 缺失' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ok = await deletePost(slug);
    if (!ok) {
      return new Response(
        JSON.stringify({ error: '文章不存在或删除失败' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = (err as Error).message;
    console.error('[api:posts:slug:DELETE]', msg);
    return new Response(
      JSON.stringify({ error: msg, detail: import.meta.env.DEV ? (err as Error).stack : undefined }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
