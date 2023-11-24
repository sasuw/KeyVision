<script setup>
import Keyboard from "@/components/Keyboard.vue";
import Shortcuts from "@/components/Shortcuts.vue";
import { onMounted, ref } from 'vue';
import AppChooser2 from "@/components/AppChooser2.vue";

const apps = ref([]);
let selectedKeyCode = ref(null);

onMounted(async () => {
  const response = await fetch('http://localhost:3000/applications');
  apps.value = await response.json();
});

const handleKeyClicked = (keyCode) => {
  console.log('Key clicked in parent:', keyCode);
  selectedKeyCode.value = keyCode;
};

const handleKeyPressed = (keyCode) => {
  console.log('Key pressed in parent:', keyCode);
  selectedKeyCode.value = keyCode;
};

let appName = ref('');
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
                        :items="apps" item-title="displayName" item-value="name">
            </v-combobox>
          </Suspense>
        </v-card-item>
      </v-card>
      <v-card class="my-2">
        <v-card-title><h3>Keyboard</h3></v-card-title>
        <v-card-item>
          <Suspense>
            <Keyboard @key-clicked="handleKeyClicked" @key-pressed="handleKeyPressed" ref="keyboard" name="ISO 105"></Keyboard>
          </Suspense>
        </v-card-item>
      </v-card>
      <v-card class="my-2">
        <v-card-title>Hotkeys</v-card-title>
        <v-card-item>
          <Suspense>
            <Shortcuts :selectedKeyCode="selectedKeyCode" ref="shortcuts" app-name="exampleApp"></Shortcuts>
          </Suspense>
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
