/* empty css                                 */
import { c as createAstro, d as createComponent, g as renderHead, r as renderTemplate } from '../chunks/astro/server_BQ_I1sSR.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const adminPassword = "admin";
  const allowed = Astro2.url.searchParams.get("key") === adminPassword;
  if (!allowed) {
    return new Response(
      `<!DOCTYPE html>
    <html lang="zh-CN">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>管理后台 - 验证</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { display:flex; align-items:center; justify-content:center; min-height:100vh;
             background:#0f172a; color:#f1f5f9; font-family:system-ui,sans-serif; }
      form { background:#1e293b; padding:2rem; border-radius:0.75rem; border:1px solid #334155;
             display:flex; flex-direction:column; gap:1rem; min-width:300px; }
      input { padding:0.75rem; border:1px solid #334155; border-radius:0.5rem;
              background:#0f172a; color:#f1f5f9; font-size:1rem; }
      button { padding:0.75rem; background:#2563eb; color:white; border:none; border-radius:0.5rem;
               font-size:1rem; cursor:pointer; }
      h1 { font-size:1.25rem; text-align:center; }
    </style></head>
    <body>
      <form method="get">
        <h1>管理后台</h1>
        <input type="password" name="key" placeholder="请输入访问密码" autofocus />
        <button type="submit">进入</button>
      </form>
    </body></html>`,
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  }
  return renderTemplate`<html lang="zh-CN" data-astro-cid-2zp6q64z> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>管理后台 - My Blog</title>${renderHead()}</head> <body data-astro-cid-2zp6q64z> <!-- 侧边栏 --> <aside data-astro-cid-2zp6q64z> <div class="aside-header" data-astro-cid-2zp6q64z> <h2 data-astro-cid-2zp6q64z>文章列表</h2> <button class="btn primary" id="btn-new" data-astro-cid-2zp6q64z>+ 新建</button> </div> <div class="post-list" id="post-list" data-astro-cid-2zp6q64z> <!-- 由 JS 动态填充 --> </div> </aside> <!-- 主区域 --> <main data-astro-cid-2zp6q64z> <!-- 顶部工具栏 --> <div class="toolbar" data-astro-cid-2zp6q64z> <span id="page-title" style="font-weight:600;" data-astro-cid-2zp6q64z>新建文章</span> <span class="save-status" id="save-status" data-astro-cid-2zp6q64z> <span id="save-icon" data-astro-cid-2zp6q64z></span> <span id="save-text" data-astro-cid-2zp6q64z>未修改</span> </span> </div> <!-- 元数据 --> <div class="meta-bar" data-astro-cid-2zp6q64z> <input type="text" id="field-title" placeholder="文章标题" data-astro-cid-2zp6q64z> <input type="date" id="field-date" data-astro-cid-2zp6q64z> <input type="text" id="field-tags" placeholder="标签, 逗号分隔" data-astro-cid-2zp6q64z> <div class="slug-row" data-astro-cid-2zp6q64z> <span data-astro-cid-2zp6q64z>slug:</span> <input type="text" id="field-slug" placeholder="自动生成" data-astro-cid-2zp6q64z> <input type="text" id="field-description" placeholder="文章摘要（可选）" style="flex:2" data-astro-cid-2zp6q64z> </div> </div> <!-- 编辑器主体 --> <div class="editor-body" data-astro-cid-2zp6q64z> <div class="editor-pane" data-astro-cid-2zp6q64z> <div class="pane-header" data-astro-cid-2zp6q64z>Markdown 编辑</div> <textarea id="editor" placeholder="在此编写 Markdown 内容..." data-astro-cid-2zp6q64z></textarea> </div> <div class="preview-pane" data-astro-cid-2zp6q64z> <div class="pane-header" data-astro-cid-2zp6q64z>实时预览</div> <div class="preview-content" id="preview" data-astro-cid-2zp6q64z></div> </div> </div> <!-- 底部 --> <div style="padding:0.5rem 1rem;border-top:1px solid var(--border);display:flex;gap:0.5rem;background:var(--bg);flex-shrink:0" data-astro-cid-2zp6q64z> <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;color:var(--text2);cursor:pointer" data-astro-cid-2zp6q64z> <input type="checkbox" id="field-draft" data-astro-cid-2zp6q64z> 草稿（不公开）
</label> <button class="btn danger" id="btn-delete" style="margin-left:auto;display:none" data-astro-cid-2zp6q64z>删除文章</button> </div> </main>  </body> </html>`;
}, "D:/CCwork/my-blog/src/pages/admin.astro", void 0);
const $$file = "D:/CCwork/my-blog/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
