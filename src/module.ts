import { resolve } from 'pathe'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineNuxtModule } from '@nuxt/kit'
import type {
  CompileOptions,
  IdentifierOption
} from '@vanilla-extract/integration'

interface ModuleOptions {
  identifiers?: IdentifierOption
  esbuildOptions?: CompileOptions['esbuildOptions']
}

const isProduction = process.env.NODE_ENV === 'production'

// Without this, build will fail
function addDefaultExport () {
  let config
  return {
    name: 'nuxt-vanilla-extract',
    configResolved (resolvedConfig) {
      config = resolvedConfig
    },
    transform (code, id) {
      if (config.command === 'build' && id.includes('.css.ts') && !code.includes('export default')) {
        return {
          code: `${code}\nexport default {}`,
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
      nuxt: '^3.0.0-rc.12'
    }
  },
  defaults: {},
  setup (options, nuxt) {
    nuxt.hook('vite:extendConfig', (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(vanillaExtractPlugin(options))

      if (nuxt.options.ssr && isProduction) {
        config.plugins.push(addDefaultExport())
      }
    })

    // TODO: Remove this if @vanilla-extract/css updated their @emotion/hash version to 0.9.0
    if (process.env.NODE_ENV === 'production' && nuxt.options.ssr) {
      nuxt.options.alias['@emotion/hash'] = resolve('./node_modules/@emotion/hash/dist/emotion-hash.cjs.js')
    }
  }
})
