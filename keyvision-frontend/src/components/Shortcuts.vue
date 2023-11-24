<script setup>

import {computed, onMounted, ref} from "vue";

defineProps( {
  appName: {
    required: true,
    type: String
  }
})

let config = computed( async () => {

  // const response = await fetch('http://localhost:3000/applications/config/' + 'exampleApp');
  const response = await fetch('http://localhost:3000/cs16.json');
  const json = await response.json();
  console.log(json)
  return json;
})

</script>

<template>
  <div v-if="config">{{config}}</div>
  <v-data-table v-if="config && config.shortcuts && config.shortcuts.length > 0" :items="config.shortcuts" @click="">

  </v-data-table>
</template>

<style scoped>

</style>