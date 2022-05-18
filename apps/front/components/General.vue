<template>
  <div>
    <v-row v-for="key in Object.keys(disk)" :key="key">
      <v-col cols="4" class="font-weight-bold text-right"
        >{{ toTitleCase(key) }}:</v-col
      >
      <v-col>{{ disk[key] }}</v-col>
    </v-row>
    <v-row v-if="partitions.length > 0">
      <v-col cols="12">
        <span class="text-h6">Disk partitions</span>
      </v-col>
      <v-col cols="12">
        <ApexCharts
          type="donut"
          :options="{ labels: partitions.map((p) => p.path) }"
          :series="partitions.map((p) => p.capacity)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import IDisk from '../interfaces/IDisk';
import IPartition from '../interfaces/IPartition';

import { toTitleCase } from '../utils/text';

interface GeneralProps {
  disk: IDisk;
  partitions: IPartition[];
}

defineProps<GeneralProps>();
</script>
