<template>
    <v-app>
        <Toolbar></Toolbar>
        <Sidebar></Sidebar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Toolbar from "./components/nav/Toolbar";
    import Sidebar from "./components/nav/Sidebar";

    export default {
        name: 'App',

        components: {
            Sidebar,
            Toolbar,
        },

        data: () => ({
            //
        }),
    };
</script>
