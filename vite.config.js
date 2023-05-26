import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    loaderOptions: {
      sass: {
        // additionalData: `@import "@/styles/global.scss";`
        additionalData: `@import "src/assets/styles/style.scss";`, // добавьте ваши собственные пользовательские стили здесь
      }
    }
  }
})
