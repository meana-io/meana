<template>
  <v-app>
    <Topbar />
    <NodesList />
    <RightMenu />
    <Content />
  </v-app>
</template>

<script lang="ts">
import Topbar from '../components/Topbar.vue';
import NodesList from '../components/NodesList.vue';
import Content from '../components/Content.vue';
import RightMenu from '../components/RightMenu.vue';
export default {
  components: { Content, RightMenu, NodesList, Topbar },
};
</script>
