import { init, parse } from 'es-module-lexer'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineNuxtModule } from '@nuxt/kit'
import type {
  CompileOptions,
  IdentifierOption
} from '@vanilla-extract/integration'
import type { Plugin } from 'vite'

interface ModuleOptions {
  identifiers?: IdentifierOption
  esbuildOptions?: CompileOptions['esbuildOptions']
}

const isProduction = process.env.NODE_ENV === 'production'

// Need to add default exports to *.css.ts files for SSR builds
function addDefaultExport (): Plugin {
  let config: any
  return {
    name: 'nuxt-vanilla-extract',
    configResolved (resolvedConfig) {
      config = resolvedConfig
    },
    async transform (code, id) {
      if (!id.includes('.css.')) {
        return
      }
      await init
      const [, exports] = parse(code)
      const withoutDefaultExport = exports.filter(e => e.n === 'default').length === 0
      const isBuild = config.command === 'build'
      if (isBuild && withoutDefaultExport) {
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
    configKey: 'vanilla'
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
  }
})
