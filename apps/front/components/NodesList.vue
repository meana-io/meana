<template>
  <v-navigation-drawer app width="300">
    <DiskNodes
      :api-route="[
        { id: 1, name: 'server 1' },
        { id: 2, name: 'server 2' },
        {
          id: 3,
          name: 'Home',
          children: [
            { id: 4, name: 'server 3' },
            { id: 5, name: 'server 4' },
            { id: 6, name: 'server 5' },
          ],
        },
      ]"
    />
  </v-navigation-drawer>
</template>

<script lang="ts">
import DiskNodes from './DiskNodes.vue';

export default {
  components: { DiskNodes },
};
</script>
