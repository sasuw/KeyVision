<script setup>

import {computed} from "vue";

defineProps( {
  appName: {
    required: true,
    type: String
  }
})

let shortcuts = computed(async () => {
  //todo /config/
  const response = await fetch('http://localhost:3000/applications/shortcuts/' + 'exampleApp');
  return response.json();
})

</script>

<template>
  <div>{{shortcuts}}</div>
</template>

<style scoped>

</style>