<script setup>

import {computed} from "vue";

defineProps( {
  appName: {
    required: true,
    type: String
  }
})

let shortcuts = computed(async () => {
  const response = await fetch('http://localhost:3000/applications/config/' + appName);
  return response.json().shortcuts;
})

</script>

<template>
  <v-data-table :items="shortcuts.shortcuts" @click="">

  </v-data-table>
</template>

<style scoped>

</style>