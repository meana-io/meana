<template>
  <v-treeview  
    :items="servers" 
    open-on-click
    activatable
    color="none"
    @update:active="test">
  </v-treeview>   
</template>

<script>


  export default {
    name: 'DiskNode',
    data() {
      return {
        servers: this.apiRoute,
      }
    },
    props: {
      apiRoute: Array
    },
    methods: {
      test() {
        console.log('TEST')
      }
    }
  }

</script>
