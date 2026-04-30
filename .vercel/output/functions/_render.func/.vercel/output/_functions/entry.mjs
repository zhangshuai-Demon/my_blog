import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_UYYdxLTe.mjs';
import { manifest } from './manifest_BTkL--Gs.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/posts/_slug_.astro.mjs');
const _page4 = () => import('./pages/api/posts.astro.mjs');
const _page5 = () => import('./pages/blog/_slug_.astro.mjs');
const _page6 = () => import('./pages/rss.xml.astro.mjs');
const _page7 = () => import('./pages/tags/_tag_.astro.mjs');
const _page8 = () => import('./pages/tags.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.md", _page1],
    ["src/pages/admin.astro", _page2],
    ["src/pages/api/posts/[slug].ts", _page3],
    ["src/pages/api/posts.ts", _page4],
    ["src/pages/blog/[slug].astro", _page5],
    ["src/pages/rss.xml.js", _page6],
    ["src/pages/tags/[tag].astro", _page7],
    ["src/pages/tags/index.astro", _page8],
    ["src/pages/index.astro", _page9]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "998e8724-8f19-4404-a0ef-f00c2f74261b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
