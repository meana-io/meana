<template>
  <v-row>
    <pre>{{ JSON.stringify(disk) }}</pre>
  </v-row>
</template>

<script setup lang="ts">
import Disk from '../types/Disk';

interface GeneralProps {
  disk: Disk;
}

defineProps<GeneralProps>();
</script>
