<template>
  <v-app>
    <Topbar />
    <NodesList />
    <RightMenu />
    <Content />
  </v-app>
</template>

<script lang="ts">
import Topbar from './Topbar.vue';
import NodesList from './NodesList.vue';
import Content from './Content.vue';
import RightMenu from './RightMenu.vue';
export default {
  components: { Content, RightMenu, NodesList, Topbar },
};
</script>
