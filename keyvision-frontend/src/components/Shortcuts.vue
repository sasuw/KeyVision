<script setup>
import { watch, onMounted, ref } from "vue";

defineProps({
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

// Method to handle keycode changes
const handleKeyCodeChange = (newKeyCode) => {
  if (newKeyCode !== null) {
    console.log('New keycode received in Shortcuts:', newKeyCode);
    // Implement your logic here. For example:
    // - You could filter the shortcuts based on the new keycode.
    // - You could highlight the shortcut associated with the keycode.
    // - Any other action you need to perform.
  }

// Watcher for selectedKeyCode
  watch(() => props.selectedKeyCode, (newKeyCode) => {
    handleKeyCodeChange(newKeyCode);
  });
}
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
