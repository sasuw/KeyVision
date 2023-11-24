<script setup>
import { watch, onMounted, ref } from "vue";

const props = defineProps({
  appName: {
    required: true,
    type: String
  },
  selectedKeyCode: Number
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

const handleKeyCodeChange = (newKeyCode) => {
  if (newKeyCode !== null) {
    console.log('New keycode received in Shortcuts:', newKeyCode);

    const keymappings = config._rawValue.keymappings
    const key = Object.keys(keymappings).find(key => keymappings[key] === newKeyCode.toString());

    console.log(keymappings);

    // Implement your logic here...
  }
}; // This brace closes handleKeyCodeChange

// Watcher for selectedKeyCode
watch(() => props.selectedKeyCode, (newKeyCode) => {
  handleKeyCodeChange(newKeyCode);
});
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
