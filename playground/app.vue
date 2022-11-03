<script setup lang="ts">
import { exampleStyle, themeClass } from '~~/styles/styles.css'
</script>

<template>
  <section :class="themeClass">
    <h1 :class="exampleStyle">
      Hello world!s
    </h1>
  </section>
</template>
