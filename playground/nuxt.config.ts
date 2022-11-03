import Module from '../src/module'

const possibleFiles = ['.css.ts', '.css.mjs', '.css.js']
const isProduction = process.env.NODE_ENV === 'production'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [Module],
})
