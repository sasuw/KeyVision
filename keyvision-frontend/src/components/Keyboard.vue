<script setup>
import Key from "@/components/Key.vue";

const response = await fetch('/resources/keyboard.json');
const keyboardData = await response.json();

defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="keyboard">
    <div v-for="row in keyboardData" class="row">
      <Key v-for="key in row"
           :key-code="key.keyCode"
           :label="key.label"
           :width="key.width" />
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