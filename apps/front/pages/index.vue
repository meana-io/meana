<template>
  <DiskNodes :apiRoute="[{name: 'server 1'}, {name: 'server 2'}, {name: 'server 3'}]"/>
</template>

<script lang="ts">
import Vue from 'vue';

import DiskNodes from '../components/DiskNodes.vue'

export default Vue.extend({
  components: {
    DiskNodes
  }
});
</script>
