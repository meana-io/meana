<template>
  <v-card>
    <v-card-title class="text-h5">Partition </v-card-title>
    <v-card-text>
      <v-row v-for="key in Object.keys(partition).filter(k => !keysToFilterOut.includes(k))" :key="key">
        <v-col cols="4" class="font-weight-bold text-right"
          >{{ toTitleCase(key) }}:</v-col
        >
        <v-col>{{ partition[key] }}</v-col>
      </v-row>
    </v-card-text>
    <v-divider />
    <v-card-title class="text-h5">Partitions space</v-card-title>

    <v-card-text>
      <ApexCharts
        type="donut"
        :options="{ labels: ['Free', 'Used'] }"
        :series="[
          partition.capacity - partition.usedSpace,
          partition.usedSpace,
        ]"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import IPartition from '../interfaces/IPartition';
import { toTitleCase } from '../utils/text';

const keysToFilterOut = ['id', 'diskId', 'created_at', 'updated_at'];

interface GeneralProps {
  partition: IPartition;
}

defineProps<GeneralProps>();
</script>
