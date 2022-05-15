<template>
  <v-treeview  
    :items="servers" 
    open-on-click
    activatable
    @update:active="test">
  </v-treeview>   
</template>


<script>
  export default {
    name: 'DiskNodes',
    
    data() {
      return {
        servers: [],
      }
    },
    props: {
      apiRoute: String
    },
    mounted() {
      fetch(this.apiRoute)
      .then(res => res.json())
      .then(data => this.servers = data)
      .catch(err => console.log(err))
    },
    methods: {
      test() {
        console.log('TEST')
      }
    }
  }

</script>
