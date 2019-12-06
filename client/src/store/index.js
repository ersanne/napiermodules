import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        drawer: false,
        links: [
            {
                id: 'module_list',
                text: 'Module List'
            },
            {
                id: 'saved_modules',
                text: 'Saved Modules'
            },
            {
                id: 'login',
                text: 'Login'
            },
            {
                id: 'registration',
                text: 'Sign Up'
            }
        ]
    },
    mutations: {},
    actions: {},
    modules: {}
})
