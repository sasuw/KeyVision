<script setup>

const response = await fetch('http://localhost:3000/applications');
const apps = await response.json();
defineProps( {
    modelProp: {
      type: String,
      required: true
    }
}
)
</script>

<template>

  <v-combobox label="Select Application"
              :items="apps" :item-title="displayName" :item-value="name">

  </v-combobox>
</template>

<style scoped>

</style>