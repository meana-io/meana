<template>
  <div>
    <v-row v-for="key in Object.keys(partition)" :key="key">
      <v-col cols="4" class="font-weight-bold text-right"
        >{{ toTitleCase(key) }}:</v-col
      >
      <v-col>{{ partition[key] }}</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="text-h6">Partitions space</span>
      </v-col>
      <v-col cols="12">
        <ApexCharts
          type="donut"
          :options="{ labels: ['Free', 'Used'] }"
          :series="[partition.capacity - partition.usedSpace, partition.usedSpace]"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import IPartition from '../interfaces/IPartition';
import { toTitleCase } from '../utils/text';

interface GeneralProps {
  partition: IPartition;
}

defineProps<GeneralProps>();
</script>
