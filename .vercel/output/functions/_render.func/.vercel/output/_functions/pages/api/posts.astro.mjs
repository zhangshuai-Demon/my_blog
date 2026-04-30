import { l as listPosts, s as savePost } from '../../chunks/posts_DOOrJ7w8.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const posts = await listPosts();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const msg = err.message;
    console.error("[api:posts:GET]", msg);
    return new Response(
      JSON.stringify({ error: msg, detail: void 0 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { slug, ...postData } = body;
    if (!slug || !postData.title) {
      return new Response(
        JSON.stringify({ error: "slug 和 title 为必填项" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9一-鿿-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    await savePost(safeSlug, postData);
    return new Response(
      JSON.stringify({ ok: true, slug: safeSlug }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err.message;
    console.error("[api:posts:POST]", msg);
    return new Response(
      JSON.stringify({ error: msg, detail: void 0 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
