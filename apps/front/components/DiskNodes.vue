<template>
  <v-treeview :items="nodes" open-on-click activatable color="none" />
</template>

<script setup lang="ts">
import INode from '../interfaces/INode';

interface DiskNodesProps {
  nodes: INode[];
}

defineProps<DiskNodesProps>();
</script>
