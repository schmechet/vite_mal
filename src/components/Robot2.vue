<script setup lang="ts">
import classes from './Robot2.module.css'

console.log(__APP_VERSION__);
</script>

<template>
  <p>Ich bin Robot 2</p>
  <h2 :class="classes.green">ich bin grün</h2>
</template>

