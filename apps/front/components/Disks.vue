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
        <General :disk="selectedDisk" :partitions="partitions" />
      </v-col>
      <v-divider vertical />
      <v-col cols="6">
        <Partitions :partition="selectedPartiton" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  watch,
  defineComponent,
  toRefs,
  reactive,
  onBeforeMount,
} from '@nuxtjs/composition-api';

import IDisk from '../interfaces/IDisk';
import IPartition from '../interfaces/IPartition';

import useApi from '../composable/useApi';

import DiskService from '../services/DiskService';
import PartitionService from '../services/PartitionService';

import Header from './Header.vue';
import General from './General.vue';
import Partitions from './Partitions.vue';

interface IDiskState {
  disks: IDisk[] | [];
  selectedDisk: IDisk | {};
}

const useDisk = (nodeId: string) => {
  const state = reactive<IDiskState>({
    disks: [],
    selectedDisk: {},
  });

  onBeforeMount(async () => {
    const { data } = await useApi<IDisk>(DiskService.getAllNodeDisks, nodeId);
    state.disks = data.value;
  });

  const setDisk = (diskId: string) => {
    state.selectedDisk = state.disks.find(({ id }) => id === diskId);
  };

  return { ...toRefs(state), setDisk };
};

interface IPartitionState {
  partitions: IPartition[] | [];
  selectedPartiton: IPartition | {};
}

const usePartition = (selectedDisk: IDisk | {}) => {
  const state = reactive<IPartitionState>({
    partitions: [],
    selectedPartiton: {},
  });

  watch(selectedDisk, async (disk: IDisk) => {
    const { data } = await useApi<IPartition | {}>(
      PartitionService.get,
      disk.id
    );
    state.partitions = data.value;
    state.selectedPartiton = {};
  });

  const setPartition = (partitionId: string) => {
    state.selectedPartiton = state.partitions.find(
      ({ id }) => id === partitionId
    );
  };

  return { ...toRefs(state), setPartition };
};

export default defineComponent({
  components: {
    Header,
    General,
    Partitions,
  },
  setup() {
    const { setDisk, disks, selectedDisk } = useDisk();

    const { setPartition, partitions, selectedPartiton } =
      usePartition(selectedDisk);

    return {
      selectedDisk,
      selectedPartiton,
      setDisk,
      disks,
      setPartition,
      partitions,
    };
  },
});
</script>
