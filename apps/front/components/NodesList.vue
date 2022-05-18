<template>
  <v-navigation-drawer app width="500">
    <v-treeview
      :items="nodes"
      open-on-click
      activatable
      color="none"
      @update:active="setActiveNode"
    />
    <pre>{{ JSON.stringify(activeNode, null, 2) }}</pre>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { onBeforeMount, reactive, toRefs, watch, defineComponent, useRouter } from '@nuxtjs/composition-api';

import useApi from '../composable/useApi';

import NodeService from '../services/NodeService';

import INode from '../interfaces/INode';

interface INodeState {
  nodes: INode[] | [];
  activeNode: string;
}

const useNodes = () => {
  const state = reactive<INodeState>({
    nodes: [],
    activeNode: '',
  });

  onBeforeMount(async () => {
    const { data } = await useApi<INode[]>(NodeService.getAll);
    state.nodes = data.value;
  });

  const setActiveNode = (activeNodes: string[]) => {
    state.activeNode = activeNodes[0] ?? '';
  };

  return { ...toRefs(state), setActiveNode };
};

export default defineComponent({
  setup() {
    const { nodes, activeNode, setActiveNode } = useNodes();

    const router = useRouter();

    watch(activeNode, (newActiveNode) => {
      console.log(newActiveNode);
      router.push({ name: 'nodes', params: { nodeId: newActiveNode } });
    });

    return {
      nodes,
      activeNode,
      setActiveNode,
    };
  },
});
</script>
