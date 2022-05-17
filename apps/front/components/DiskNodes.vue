<template>
  <v-treeview
    :items="servers"
    open-on-click
    activatable
    color="none"
    @update:active="test"
  >
  </v-treeview>
</template>

<script>
export default {
  name: 'DiskNode',
  props: {
    apiRoute: Array,
  },
  data() {
    return {
      servers: this.apiRoute,
    };
  },
  methods: {
    test() {
      console.log('TEST');
    },
  },
};
</script>
