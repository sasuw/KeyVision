<script setup>
import Keyboard from "@/components/Keyboard.vue";
import Shortcuts from "@/components/Shortcuts.vue";
import { onMounted, ref } from 'vue';

const apps = ref([]);

onMounted(async () => {
  const response = await fetch('http://localhost:3000/applications');
  apps.value = await response.json();
});

const appsBla = [
  { "name": "ExampleApp"},
  { "name": "CS:GO"},
]


let appName;
</script>

<template>
  <v-app>
    <v-main>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>KeyVision</v-app-bar-title>
      </v-app-bar>
      <v-card class="my-2">
        <v-card-title><h3>Import Application</h3></v-card-title>
        <v-card-item>
          <Suspense>
            <v-combobox  v-if="apps && apps.length > 0" label="Select Application" v-model="appName"
                        :items="apps" :item-title="displayName" :item-value="name">
            </v-combobox>
          </Suspense>
        </v-card-item>
      </v-card>
      <v-card class="my-2">
        <v-card-title><h3>Keyboard</h3></v-card-title>
        <v-card-item>
          <Suspense>
            <Keyboard name="ISO 105"></Keyboard>
          </Suspense>
        </v-card-item>
      </v-card>
      <v-card class="my-2">
        <v-card-title>Hotkeys</v-card-title>
        <v-card-item>
          <Shortcuts app-name="exampleApp"></Shortcuts>
        </v-card-item>
      </v-card>
    </v-main>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
