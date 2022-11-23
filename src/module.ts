import { resolve } from 'pathe'
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
    transform (code, id) {
      const withoutDefaultExport = !code.includes('default')
      const isVanillaExtract = id.includes('.css.ts')
      const isBuild = config.command === 'build'
      if (isBuild && isVanillaExtract && withoutDefaultExport) {
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
  }
})
