<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Header
          :disks="disks"
          :partitions="partitions"
          @set:disk="setDisk($event)"
          @set:partition="setPartition($event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <General :disk="disk" />
      </v-col>
      <v-divider vertical />
      <v-col cols="6">
        <Partitions :partition="partition" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import Disk from '../types/Disk';
import Partition from '../types/Partition';

import Header from './Header.vue';
import General from './General.vue';
import Partitions from './Partitions.vue';

export default defineComponent({
  components: {
    Header,
    General,
    Partitions,
  },
  setup() {
    const disk = ref<Disk | {}>();
    const partition = ref<Partition | {}>();

    const setPartition = (value: string) => {
      partition.value = partitions.value.filter(({ id }) => id === value);
    };

    const setDisk = (value: string) => {
      disk.value = disks.value.filter(({ id }) => id === value);
    };

    const disks = ref<Disk[]>([
      {
        id: '787294a7-5d43-4bc6-832e-cb7b104694b4',
        nodeId: 'e0f37fb9-6704-46c6-b412-05fe3d0f1b10',
        path: '/dev/sda',
        manufacture: 'Samsung',
        model: 'ST1000LM035-1RK1',
        serialNumber: 'G92B-EC00',
        capacity: 293856480,
        firmwareVersion: '01.01A01',
        created_at: '2022-05-04 10:50:00',
        updated_at: '2022-05-04 10:50:00',
      },
      {
        id: '787294a7-5d43-4bc6-823e-cb7b104694b4',
        nodeId: 'e0f37fb9-6704-46c6-b412-05fe3d0f1b10',
        path: '/dev/sda',
        manufacture: 'Electronic',
        model: 'ST1000LM035-1RK1',
        serialNumber: 'G92B-EC00',
        capacity: 193856480,
        firmwareVersion: '01.01A01',
        created_at: '2022-05-04 10:50:00',
        updated_at: '2022-05-04 10:50:00',
      },
      {
        id: '787294a7-5d43-4bc6-8c9e-cb7b104694b4',
        nodeId: 'e0f37fb9-6704-46c6-b412-05fe3d0f1b10',
        path: '/dev/sda',
        manufacture: ' Disk',
        model: 'ST1230Kk035-1RR1',
        serialNumber: 'G92B-EC00',
        capacity: 383856480,
        firmwareVersion: '01.01A01',
        created_at: '2022-05-04 10:50:00',
        updated_at: '2022-05-04 10:50:00',
      },
    ]);

    const partitions = ref<Partition[]>([
      {
        id: 'd74deece-6aa8-4d7b-b3de-0f816959c150',
        diskId: '787294a7-5d43-4bc6-8c9e-cb7b104694b4',
        path: '/snap/core/4486',
        usedSpace: 293856,
        capacity: 293856480,
        fileSystem: 'ext3',
        created_at: '2022-05-04 10:50:00',
        updated_at: '2022-05-04 10:50:00',
      },
      {
        id: 'd74dddde-6aa8-4d7b-b3de-0f816959c150',
        diskId: '787294a7-5d43-4bc6-8c9e-cb7b104694b4',
        path: '/snap/core/4487',
        usedSpace: 293856,
        capacity: 293856480,
        fileSystem: 'ext3',
        created_at: '2022-05-04 10:50:00',
        updated_at: '2022-05-04 10:50:00',
      },
      {
        id: 'd74ddcce-6aa8-4d7b-b3de-0f816959c150',
        diskId: '787294a7-5d43-4bc6-8c9e-cb7b104694b4',
        path: '/snap/core/4489',
        usedSpace: 293856,
        capacity: 293856480,
        fileSystem: 'ext3',
        created_at: '2022-05-04 10:50:00',
        updated_at: '2022-05-04 10:50:00',
      },
    ]);

    return { disk, partition, setDisk, disks, setPartition, partitions };
  },
});
</script>

<!--
const nodes = {
  data: [
    {
      id: 'e0f37fb9-6704-46c6-b412-05fe3d0f1b10',
      name: 'AWS_EC2_t2_micro',
      created_at: '2022-05-04 10:50:00',
      updated_at: '2022-05-04 10:50:00',
    },
  ],
  count: 1,
  total: 1,
  page: 1,
  pageCount: 1,
};

const node_disk = {
  data: [
    {
      id: '787294a7-5d43-4bc6-8c9e-cb7b104694b4',
      nodeId: 'e0f37fb9-6704-46c6-b412-05fe3d0f1b10',
      path: '/dev/sda',
      manufacture: 'Samsung Electronics Disk',
      model: 'ST1000LM035-1RK1',
      serialNumber: 'G92B-EC00',
      capacity: '293856480',
      firmwareVersion: '01.01A01',
      created_at: '2022-05-04 10:50:00',
      updated_at: '2022-05-04 10:50:00',
    },
  ],
  count: 1,
  total: 1,
  page: 1,
  pageCount: 1,
}; -->
