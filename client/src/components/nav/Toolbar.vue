<template>
    <v-app-bar app color="primary">
        <v-app-bar-nav-icon
                color="blue-grey--text text--darken-3"
                class="hidden-md-and-up"
                @click.stop="drawerToggle()">
        </v-app-bar-nav-icon>
        <v-toolbar-title class="headline">
            NapierModules
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <Search></Search>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn
                    text
                    v-for="link in links"
                    :key="link.title"
                    :to="link.id"
                    :ripple="false"
                    :class="[{
            'white--text': activeIndex === link.id, //TODO: Select colour
            'white--text': activeIndex !== link.id
          }]"
                    :aria-label="link.text"
                    v-text="link.text">
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
    import {mapState} from 'vuex'
    import Search from "../Search";

    export default {
        name: "Toolbar",
        components: {Search},
        computed: mapState([
            'links',
            'activeIndex'
        ]),
        methods: {
            drawerToggle() {
                this.$store.commit('drawerToggle')
            }
        }

    }
</script>

<style scoped>

</style>
