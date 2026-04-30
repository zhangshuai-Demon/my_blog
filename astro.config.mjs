import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
<<<<<<< HEAD
  adapter: vercel(),
=======
  adapter: vercel({ runtime: 'nodejs22.x' }),
>>>>>>> d107f145f446db4a1ca82babc3463f06508b3475
  integrations: [tailwind()],
  site: 'https://example.com',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
