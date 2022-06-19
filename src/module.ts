import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { addVitePlugin, defineNuxtModule } from '@nuxt/kit'
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
  defaults: {
    identifiers: undefined,
    esbuildOptions: undefined,
  },
  setup(options, nuxt) {
    nuxt.options.build.transpile.push(/@vanilla-extract/, /@emotion/, 'outdent')

    nuxt.hook('builder:watch', async (e, path) => {
      if (e === 'change' && path.includes('.css.'))
        console.log('style updated, do something')
    })

    addVitePlugin(vanillaExtractPlugin({
      identifiers: options.identifiers,
      esbuildOptions: options.esbuildOptions,
    }))
  },
})

