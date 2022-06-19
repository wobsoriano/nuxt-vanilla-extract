<script setup lang="ts">
import { exampleStyle, themeClass } from '~/styles.css'
</script>

<template>
  <section :class="themeClass">
    <h1 :class="exampleStyle">
      Hello world!
    </h1>
  </section>
</template>
