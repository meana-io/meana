<template>
  <v-card>
    <v-card-title class="text-h5"> Generals </v-card-title>
    <v-card-text>
      <v-row v-for="key in Object.keys(disk).filter(k => !keysToFilterOut.includes(k))" :key="key">
        <v-col cols="4" class="font-weight-bold text-right"
          >{{ toTitleCase(key) }}:</v-col
        >
        <v-col>{{ disk[key] }}</v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-card-title class="text-h5">Disk partitions</v-card-title>
    <v-card-text>
      <ApexCharts
        type="donut"
        :options="{ labels: partitions.map((p) => p.path) }"
        :series="partitions.map((p) => p.capacity)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import IDisk from '../interfaces/IDisk';
import IPartition from '../interfaces/IPartition';

import { toTitleCase } from '../utils/text';

const keysToFilterOut = ['id', 'nodeId', 'created_at', 'updated_at'];

interface GeneralProps {
  disk: IDisk;
  partitions: IPartition[];
}

defineProps<GeneralProps>();
</script>
