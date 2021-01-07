<template>
  <v-app>
    <Toolbar></Toolbar>
    <Sidebar></Sidebar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Toolbar from "./components/nav/Toolbar";
import Sidebar from "./components/nav/Sidebar";
import Footer from "@/components/Footer";

export default {
  name: 'App',

  components: {
    Footer,
    Sidebar,
    Toolbar,
  },

  data: () => ({
    //
  }),
};
</script>
