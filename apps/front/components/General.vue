<template>
  <v-row>
    <pre>{{ JSON.stringify(disk) }}</pre>
  </v-row>
</template>

<script setup lang="ts">
import IDisk from '../interfaces/IDisk';

interface GeneralProps {
  disk: IDisk;
}

defineProps<GeneralProps>();
</script>
