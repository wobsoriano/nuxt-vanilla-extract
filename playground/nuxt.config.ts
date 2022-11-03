import Module from '../src/module'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [Module],
  vite: {
    plugins: [
      {
        name: 'random-testing-mother',
        transform(src, id) {
          if (process.env.NODE_ENV === 'production' && id.includes('css.ts') && !src.includes('export default')) {
            return {
              code: `${src}\nexport default {}`,
              map: null
            }
          }
        }
      }
    ]
  }
})
