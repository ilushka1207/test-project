<template>
  <v-app>
    <v-app-bar app color="primary" dark>{{ getMetaTitle }}</v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer>&copy; Васильев Илья, ilushka911@inbox.ru, +7 985 958 88 00. Тестовое задание на должность frontend-разработчика</v-footer>
  </v-app>
</template>

<script>
import "./main.css";

export default {
  name: "App",

  computed: {
    getMetaTitle() {
      return this.$route.meta.title || "Страница без названия";
    }
  }
};
</script>
