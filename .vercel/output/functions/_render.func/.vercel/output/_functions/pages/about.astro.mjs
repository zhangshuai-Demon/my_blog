/* empty css                                 */
import { d as createComponent, f as renderComponent, r as renderTemplate, u as unescapeHTML } from '../chunks/astro/server_BQ_I1sSR.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BOBGZHmW.mjs';
export { renderers } from '../renderers.mjs';

const html = "<h2 id=\"关于我\">关于我</h2>\n<p>你好！我是 [你的名字]，一名热爱技术和写作的开发者。</p>\n<p>这里是记录我学习、思考和探索的地方。写博客对我而言不仅是分享，更是一种整理思绪、深化理解的方式。</p>\n<h2 id=\"关于这个博客\">关于这个博客</h2>\n<p>这个博客由 <a href=\"https://astro.build\">Astro</a> 驱动，托管在 Vercel 上。没有广告，没有跟踪脚本，只有纯粹的内容。</p>\n<ul>\n<li>文章用 Markdown 编写</li>\n<li>支持深色 / 浅色模式切换</li>\n<li>响应式设计，手机和桌面端都有良好的阅读体验</li>\n</ul>\n<h2 id=\"联系我\">联系我</h2>\n<ul>\n<li>GitHub：[你的 GitHub]</li>\n<li>Email：[你的邮箱]</li>\n</ul>\n<p>欢迎交流，共同进步。</p>";

				const frontmatter = {"title":"关于","prerender":true,"layout":"../layouts/BaseLayout.astro"};
				const file = "D:/CCwork/my-blog/src/pages/about.md";
				const url = "/about";
				function rawContent() {
					return "\n## 关于我\n\n你好！我是 [你的名字]，一名热爱技术和写作的开发者。\n\n这里是记录我学习、思考和探索的地方。写博客对我而言不仅是分享，更是一种整理思绪、深化理解的方式。\n\n## 关于这个博客\n\n这个博客由 [Astro](https://astro.build) 驱动，托管在 Vercel 上。没有广告，没有跟踪脚本，只有纯粹的内容。\n\n- 文章用 Markdown 编写\n- 支持深色 / 浅色模式切换\n- 响应式设计，手机和桌面端都有良好的阅读体验\n\n## 联系我\n\n- GitHub：[你的 GitHub]\n- Email：[你的邮箱]\n\n欢迎交流，共同进步。\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"关于我","text":"关于我"},{"depth":2,"slug":"关于这个博客","text":"关于这个博客"},{"depth":2,"slug":"联系我","text":"联系我"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$BaseLayout, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
