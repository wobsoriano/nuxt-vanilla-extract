<script setup lang="ts">
import { exampleStyle, themeClass } from '~~/styles/styles.css.mjs'
</script>

<template>
  <section :class="themeClass">
    <h1 :class="exampleStyle">
      Hello world!
    </h1>
  </section>
</template>
