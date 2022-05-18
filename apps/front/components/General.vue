<template>
  <div>
    <v-row v-for="key in Object.keys(disk)" :key="key">
      <v-col cols="4" class="font-weight-bold text-right"
        >{{ toTitleCase(key) }}:</v-col
      >
      <v-col>{{ disk[key] }}</v-col>
    </v-row>
    <ApexCharts
      width="500"
      type="pie"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import IDisk from '../interfaces/IDisk';

import { toTitleCase } from '../utils/text';

const chartOptions = {
  chart: {
    id: 'vuechart-example',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};

const series = [
  {
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
];

interface GeneralProps {
  disk: IDisk;
}

defineProps<GeneralProps>();
</script>
