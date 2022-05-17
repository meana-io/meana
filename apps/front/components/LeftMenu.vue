<template>
  <v-navigation-drawer app clipped right>
    <v-list>
      <v-list-item v-for="icon in icons" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> {{ icon }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const icons = ref<string[]>([
      'mdi-view-dashboard',
      'mdi-account-box',
      'mdi-cog',
    ]);

    return {
      icons,
    };
  },
});
</script>
