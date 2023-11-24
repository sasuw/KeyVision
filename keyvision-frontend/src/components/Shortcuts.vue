<script setup>

import {computed, onMounted, ref} from "vue";

defineProps( {
  appName: {
    required: true,
    type: String
  }
})

let config = ref();

onMounted(async () => {
  const response = await fetch('http://localhost:3000/applications/config/' + 'exampleApp');
  const json = await response.json();
  config.value = json.text()
});
//
// let config = computed(async () => {
//   const response = await fetch('http://localhost:3000/applications/config/' + 'exampleApp');
//   console.log(response)
//   return response.json();
// })

</script>

<template>
  <div>{{config}}</div>
  <v-data-table :items="config.shortcuts" @click="">

  </v-data-table>
</template>

<style scoped>

</style>