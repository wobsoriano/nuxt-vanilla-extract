<script setup lang="tsx">
import * as styles from '@/styles/index.css'

const Container = defineComponent((_props, { slots }) => {
  return () => <div class={styles.root}>{slots.default?.()}</div>
})
</script>

<template>
  <Container>
    <h1>🧁 Hello from vanilla-extract!</h1>
  </Container>
</template>
