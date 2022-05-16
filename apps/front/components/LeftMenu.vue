<template>
  <v-navigation-drawer app clipped right>
    <v-list>
      <v-list-item v-for="item in items" :key="item.icon" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> {{ item.icon }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: 'mdi-view-dashboard' },
      { icon: 'mdi-account-box' },
      { icon: 'mdi-cog' },
    ],
  }),
};
</script>
