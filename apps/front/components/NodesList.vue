<template>
  <v-navigation-drawer app width="300">
    <DiskNodes :nodes="nodes" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { onBeforeMount, reactive, toRefs } from '@vue/composition-api';

import useApi from '../composable/useApi';

import NodeService from '../services/NodeService';
import INode from '../interfaces/INode';

import DiskNodes from './DiskNodes.vue';

interface INodeState {
  nodes: INode[] | [];
}

const useNodes = () => {
  const state = reactive<INodeState>({
    nodes: [],
  });

  onBeforeMount(async () => {
    const { data } = await useApi<INode[]>(NodeService.getAll);
    state.nodes = data.value;
  });

  return { ...toRefs(state) };
};

export default {
  components: { DiskNodes },
  setup() {
    const { nodes } = useNodes();

    return {
      nodes,
    };
  },
};
</script>
