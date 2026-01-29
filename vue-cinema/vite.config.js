import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const alias = {
		'@': fileURLToPath(new URL('./src', import.meta.url))
	}

	if (mode === 'development') {
		/*eslint-disable*/
      alias.components = resolve(__dirname, '../components')
  }

  return {
      esbuild: {
          drop: ['console', 'debugger']
      },
      server: {
          port: 3002
      },
      plugins: [
          vue(),
          eslintPlugin()
      ],
      resolve: {
          alias,
          preserveSymlinks: true
      }
  }
})
