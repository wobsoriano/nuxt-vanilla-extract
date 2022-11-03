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

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-vanilla-extract',
    configKey: 'vanilla',
  },
  defaults: {},
  setup(options, nuxt) {
    // nuxt.options.vite.optimizeDeps.include.push('@emotion/hash')
    nuxt.hook('vite:extendConfig', (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(vanillaExtractPlugin(options))
    })

    if (process.env.NODE_ENV === 'production') {
      nuxt.options.alias['@emotion/hash'] = resolve('./node_modules/@emotion/hash/dist/emotion-hash.cjs.js')
    }
  },
})

