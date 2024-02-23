<script setup lang="ts">
import Robot1 from './Robot1.vue'
import Robot3 from './Robot3.vue'
//import Robot2 from './Robot2.vue'

defineProps<{ msg: string }>()
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <img src="/vite.svg">
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <Robot1/>
  <Robot3/>
</template>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
