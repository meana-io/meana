<template>
  <div>
    <pre>{{ JSON.stringify(partition) }}</pre>
  </div>
</template>

<script setup lang="ts">
import IPartition from '../interfaces/IPartition';

interface GeneralProps {
  partition: IPartition;
}

defineProps<GeneralProps>();
</script>
