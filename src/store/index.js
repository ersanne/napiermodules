import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeIndex: '',
        drawer: false,
        links: [
            {
                id: '/',
                text: 'Module List'
            },
            {
                id: '/modules/saved',
                text: 'Saved Modules'
            },
            {
                id: 'export',
                text: 'Export'
            },
            {
                id: 'api-doc',
                text: 'API'
            }
        ],
        savedModules: new Set()
    },
    mutations: {
        drawer(state, payload) {
            state.drawer = payload
        },
        drawerToggle(state) {
            state.drawer = !state.drawer
        },
        addSavedModule(state, moduleCode) {
            state.savedModules.add(moduleCode)
        },
        removeSavedModule(state, moduleCode) {
            state.savedModules.delete(moduleCode)
        }
    },
    actions: {},
    modules: {}
})
