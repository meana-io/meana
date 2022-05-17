<template>
  <v-row align="center">
    <v-col cols="12" sm="2">
      <p class="text-subtitle-2 text-center">Disks</p>
    </v-col>
    <v-col cols="12" sm="4">
      <v-select
        :items="disks"
        item-value="id"
        :item-text="
          ({ path, manufacture, model }) => `${path} ${manufacture} ${model}`
        "
        label="Disk"
        outlined
        @change="$emit('set:disk', $event)"
      />
    </v-col>

    <v-col cols="12" sm="4">
      <v-select
        :items="partitions"
        item-value="id"
        item-text="path"
        label="Partitions"
        outlined
        @change="$emit('set:partition', $event)"
      />
    </v-col>
    <pre>{{ JSON.stringify(disks) }}</pre>
  </v-row>
</template>

<script setup lang="ts">
import IPartition from '../interfaces/IPartition';
import IDisk from '../interfaces/IDisk';

interface HeaderProps {
  disks: IDisk[];
  partitions: IPartition[];
}

defineProps<HeaderProps>();

interface HeaderEmits {
  (e: 'set:disk', value: string): void;
  (e: 'set:partition', value: string): void;
}

defineEmits<HeaderEmits>();
</script>
