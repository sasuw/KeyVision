<script setup>
import { onMounted, onUnmounted } from 'vue';
import Key from "@/components/Key.vue";
import { ref } from 'vue';

const keyboardData = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('/resources/keyboard.json');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    console.log("Fetched keyboard data:", data);
    keyboardData.value = data;
  } catch (error) {
    console.error(error);
  }
});


//const response = await fetch('/resources/keyboard.json');
//const keyboardData = await response.json();

defineProps({
  name: {
    type: String,
    required: true
  }
});

const handleKeyClick = (keyCode) => {
  console.log('Key clicked:', keyCode);
};

const handleKeyPress = (event) => {
  keyboardData.value.forEach(row => {
    row.forEach(key => {
      if (key.keyCode === event.keyCode) {
        console.log('Key pressed:', key.keyCode);
      }
    });
  });
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});
</script>

<template>
  <div class="keyboard" v-if="keyboardData.length > 0">
    <div v-for="(row, rowIndex) in keyboardData" :key="rowIndex" class="row">
      <Key v-for="key in row" :key="key.keyCode"
           :key-code="key.keyCode" :label="key.label"
           :width="key.width" @click="handleKeyClick(key.keyCode)" />
    </div>
  </div>
</template>



<style scoped>

.keyboard {
  background-color: #ddd;
  height: 351px;
  width: 1235px;
  border-radius: 6px;
  padding: 9px;
}
.row {
  display: flex;
}

</style>