# nuxt-vanilla-extract

[![Version](https://img.shields.io/npm/v/nuxt-vanilla-extract?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/nuxt-vanilla-extract)

Zero-runtime stylesheets in your Nuxt 3 apps.

## Installation

```bash
npm install nuxt-vanilla-extract
```

## Usage

```ts
export default defineNuxtConfig({
  modules: ['nuxt-vanilla-extract']
})
```

```ts
// ~/styles/index.css.ts
import { style } from '@vanilla-extract/css'

export const root = style({
  background: 'pink',
  color: 'blue',
  padding: '16px',
  transition: 'opacity .1s ease',
  ':hover': {
    opacity: 0.8
  }
})
```

with JSX/TSX

```tsx
import * as styles from '@/styles/index.css'

export default defineComponent({
  render () {
    return (
      <div class={styles.root}>
        <h1>🧁 Hello from vanilla-extract!</h1>
      </div>
    )
  }
})
```

with script setup

```vue
<script setup lang="ts">
import * as styles from '@/styles/index.css'
</script>

<template>
  <div :class="styles.root">
    <h1>🧁 Hello from vanilla-extract!</h1>
  </div>
</template>
```

## License

MIT
