<script setup>

defineProps({
  label: {
    type: String,
    required: false
  },
  keyCode: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: false,
    default: 1
  }
})
const keyWidth = 54;
</script>

<template>
  <div v-if="keyCode != null" class="keyBorder" :style="{'width': keyWidth * width + 'px'}">
    <div class="keyTop" :style="{'width': keyWidth * width + 'px'}">
      <span class="keyLabel">{{label}}</span>
    </div>
  </div>
  <div v-else class="keyBorder" :style="{'width': keyWidth * width + 'px'}">

  </div>

</template>

<style scoped>
  .keyBorder {
    height: 54px;
    background-color: #ccc;
    border-width: 1px;
    border-radius: 0px;
    padding: 3px 6px;
  }

  .keyTop {
    width: 42px;
    height: 42px;
    line-height: 1em;
    background-color: #fcfcfc;
    padding: 3px;
  }

  .keyLabel {
    font-size: 12px;
    color: #000;
    white-space: pre-line;
    margin-top: -5px;
  }

</style>