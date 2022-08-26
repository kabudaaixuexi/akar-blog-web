import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
import requireTransform from 'vite-plugin-require-transform';


const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml (html) {
      return html.replace(
        /<title>(.*?)<\/title>/,
        '<title>「 顿学累功 」</title>'
      )
    }
  }
}

export default defineConfig({
  base: process.env.VITE_ROUTER_MODE === 'hash'
    ? ''
    : '/',
  plugins: [
    vue(),
    htmlPlugin(),
    terser(
      {
        compress: {
          drop_console: true
        }
      }
    ),
    requireTransform({
      fileRegex:/.ts$|.tsx$|.vue$/
	//   fileRegex:/.js$|.jsx$|.vue$/
    }),
  ],
  // According to the need to open proxy
  server: {
    proxy: {
      '/apiSohu': {
        target: 'http://pv.sohu.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiSohu/, '')
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  define: {
    'process.env': process.env
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/element-variables.scss' as *;`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets-blog/[name].${(new Date).getTime()}.js`,
        chunkFileNames: `assets-blog/[name].${(new Date).getTime()}.js`,
        assetFileNames: `assets-blog/[name].${(new Date).getTime()}.[ext]`
      }
    }
  }
})
