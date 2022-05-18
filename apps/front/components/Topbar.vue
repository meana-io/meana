<template>
  <v-app-bar app clipped-right flat height="72">
    <v-spacer />
    <v-switch
      v-model="$vuetify.theme.dark"
      inset
      :label="`Theme: ${$vuetify.theme.dark ? 'Dark' : 'Light'}`"
    />
  </v-app-bar>
</template>
