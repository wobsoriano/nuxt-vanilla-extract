import { resolve } from 'pathe'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineNuxtModule } from '@nuxt/kit'
import type {
  CompileOptions,
  IdentifierOption,
} from '@vanilla-extract/integration'

interface ModuleOptions {
  identifiers?: IdentifierOption
  esbuildOptions?: CompileOptions['esbuildOptions']
}

// Without this, build will fail
function addDefaultExport() {
  const isProduction = process.env.NODE_ENV === 'production'
  return {
    name: 'nuxt-vanilla-extract',
    transform(src, id) {
      if (isProduction && id.includes('.css.ts') && !src.includes('export default')) {
        return {
          code: `${src}\nexport default {}`,
          map: null
        }
      }
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-vanilla-extract',
    configKey: 'vanilla',
    compatibility: {
      "nuxt": "^3.0.0-rc.12"
    }
  },
  defaults: {},
  setup(options, nuxt) {
    nuxt.hook('vite:extendConfig', (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(vanillaExtractPlugin(options))

      if (nuxt.options.ssr) {
        config.plugins.push(addDefaultExport())
      }
    })

    // TODO: Remove this if @vanilla-extract/css updated their @emotion/hash version to 0.9.0
    if (process.env.NODE_ENV === 'production') {
      nuxt.options.alias['@emotion/hash'] = resolve('./node_modules/@emotion/hash/dist/emotion-hash.cjs.js')
    }
  },
})

