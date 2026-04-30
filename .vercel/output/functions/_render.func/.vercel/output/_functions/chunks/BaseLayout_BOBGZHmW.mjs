import { d as createComponent, m as maybeRenderHead, r as renderTemplate, e as addAttribute, f as renderComponent, c as createAstro, i as renderSlot, g as renderHead } from './astro/server_BQ_I1sSR.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="theme-toggle" type="button" class="p-2 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors" aria-label="切换主题"> <!-- 太阳图标（深色模式下显示） --> <svg id="sun-icon" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> <!-- 月亮图标（浅色模式下显示） --> <svg id="moon-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </button> `;
}, "D:/CCwork/my-blog/src/components/ThemeToggle.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const navLinks = [
    { label: "\u9996\u9875", href: "/" },
    { label: "\u6807\u7B7E", href: "/tags" },
    { label: "\u5173\u4E8E", href: "/about" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-10 bg-[var(--color-bg)]/90 backdrop-blur border-b border-[var(--color-border)]"> <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between"> <a href="/" class="text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
My Blog
</a> <nav class="hidden sm:flex items-center gap-1"> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors"> ${link.label} </a>`)} </nav> <div class="flex items-center gap-2"> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} </div> </div> </header>`;
}, "D:/CCwork/my-blog/src/components/Header.astro", void 0);

const $$SocialLinks = createComponent(($$result, $$props, $$slots) => {
  const links = [
    { name: "GitHub", href: "#", icon: "github" },
    { name: "Email", href: "mailto:hello@example.com", icon: "email" }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center gap-4"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors" target="_blank" rel="noopener noreferrer"${addAttribute(link.name, "aria-label")}> ${link.icon === "github" && renderTemplate`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path> </svg>`} ${link.icon === "email" && renderTemplate`<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg>`} </a>`)} </div>`;
}, "D:/CCwork/my-blog/src/components/SocialLinks.astro", void 0);

const $$Astro$1 = createAstro("https://example.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-[var(--color-border)] mt-16"> <div class="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"> <p class="text-sm text-[var(--color-text-muted)]">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} My Blog. Built with Astro.
</p> ${renderComponent($$result, "SocialLinks", $$SocialLinks, {})} </div> </footer>`;
}, "D:/CCwork/my-blog/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://example.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description, ogImage } = Astro2.props;
  const siteTitle = "My Blog";
  const fullTitle = title === siteTitle ? title : `${title} - ${siteTitle}`;
  const siteDescription = description || "\u4E00\u4E2A\u8BB0\u5F55\u5B66\u4E60\u4E0E\u601D\u8003\u7684\u4E2A\u4EBA\u535A\u5BA2";
  return renderTemplate(_a || (_a = __template(['<html lang="zh-CN"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- SEO --><title>', '</title><meta name="description"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website">', `<meta name="twitter:card" content="summary_large_image"><link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml"><!-- \u4E3B\u9898\u68C0\u6D4B\u811A\u672C\uFF1A\u5FC5\u987B\u5728\u9875\u9762\u6E32\u67D3\u524D\u6267\u884C\uFF0C\u907F\u514D\u6DF1\u8272\u6A21\u5F0F\u95EA\u70C1 --><script>
      (function () {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
          document.documentElement.classList.add('dark');
        }
      })();
    <\/script>`, '</head> <body class="min-h-screen flex flex-col"> ', ' <main class="flex-1"> ', " </main> ", " </body></html>"])), fullTitle, addAttribute(siteDescription, "content"), addAttribute(fullTitle, "content"), addAttribute(siteDescription, "content"), ogImage && renderTemplate`<meta property="og:image"${addAttribute(ogImage, "content")}>`, renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "D:/CCwork/my-blog/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, $$SocialLinks as a };
