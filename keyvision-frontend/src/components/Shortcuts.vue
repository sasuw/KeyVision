<script setup>
import { onMounted, ref } from "vue";

defineProps({
  appName: {
    required: true,
    type: String
  }
});

let config = ref({ shortcuts: [] });

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/cs16.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    config.value = json;
  } catch (error) {
    console.error("Fetch error:", error);
  }
});

const headers = [
  { title: 'Type', value: 'shortcutType' },
  { title: 'Action', value: 'displayName' },
  { title: 'Associated keys', value: 'keyCodes' }
]
</script>

<template>
  <v-data-table v-if="config.shortcuts && config.shortcuts.length > 0"
                :items="config.shortcuts"
                :headers="headers"
                select-strategy="single"
                show-select
                return-object
                @click="">
  </v-data-table>
</template>

<style scoped>
</style>
