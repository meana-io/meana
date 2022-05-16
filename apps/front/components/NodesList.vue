<template>
      <v-navigation-drawer
      app
      width="300"
      dark
    >
      <v-list>
        <v-list-item-content>
            <v-img>
                <img
                 height="45px"
                 width="225px"
                 red
                src="https://scontent.fpoz3-1.fna.fbcdn.net/v/t1.15752-9/280581963_308773821439203_575958233435608819_n.png?_nc_cat=109&ccb=1-6&_nc_sid=ae9488&_nc_ohc=I2l4D8RkiQkAX-hR7o-&_nc_ht=scontent.fpoz3-1.fna&oh=03_AVKzdqe6s6Bg7eS3HPDV7qm6VrEE1RjMWh7gSwldIA9vQw&oe=62A38839">
            </v-img>
        </v-list-item-content>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-content>
            <v-list-item-title>Item {{ n }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
