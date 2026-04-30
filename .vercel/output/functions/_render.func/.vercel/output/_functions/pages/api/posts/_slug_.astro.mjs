import { d as deletePost, g as getPost } from '../../../chunks/posts_DOOrJ7w8.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(
        JSON.stringify({ error: "slug 缺失" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const post = await getPost(slug);
    if (!post) {
      return new Response(
        JSON.stringify({ error: "文章不存在" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ slug, ...post }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const msg = err.message;
    console.error("[api:posts:slug:GET]", msg);
    return new Response(
      JSON.stringify({ error: msg, detail: void 0 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const DELETE = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(
        JSON.stringify({ error: "slug 缺失" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const ok = await deletePost(slug);
    if (!ok) {
      return new Response(
        JSON.stringify({ error: "文章不存在或删除失败" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const msg = err.message;
    console.error("[api:posts:slug:DELETE]", msg);
    return new Response(
      JSON.stringify({ error: msg, detail: void 0 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
