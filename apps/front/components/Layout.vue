<template>
  <v-app>
    <Topbar />
    <NodesList/>
    <LeftMenu />
    <Content />
  </v-app>
</template>

<script lang="ts">
import Topbar from "./Topbar.vue";
import NodesList from "./NodesList.vue";
import Content from "./Content.vue";
import LeftMenu from "./LeftMenu.vue";
  export default {
    components: { Content, LeftMenu, NodesList,Topbar }
}
</script>

