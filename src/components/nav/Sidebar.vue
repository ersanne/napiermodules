<template>
    <v-navigation-drawer
            v-model="drawer"
            temporary
            floating
            app>
        <v-list>
            <v-list-item
                    v-for="link in links"
                    :key="link.text"
                    :href="`#${link.id}`"
                    :class="[{
          'primary--text': activeIndex === link.id,
          'blue-grey--text text--darken-2': activeIndex !== link.id
        }]"
                    @click.stop.prevent="onClick(`#${link.id}`)"
            >
                <v-list-item-content>{{ link.text }}</v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
        name: 'Sidebar',
        computed: {
            drawer: {
                get() {
                    return this.$store.state.drawer
                },
                set(newValue) {
                    this.$store.commit('drawer', newValue)
                }
            },
            ...mapState([
                'links',
                'activeIndex'
            ])
        },
        methods: {
            onClick(hash) {
                this.drawer = false;
                this.$vuetify.goTo(hash)
            }
        }
    }
</script>

<style scoped module>
    @media only screen and (min-width: 370px) {
        .hidden-369-and-down {
            display: none !important;
        }
    }

    @media only screen and (max-width: 369px) {
        .hidden-370-and-up {
            display: none !important;
        }
    }
</style>
