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
        ],
        savedModules: new Set()
    },
    getters: {
        moduleIsSaved: (state) => (code) => {
            return state.savedModules.has(code);
        }
    },
    mutations: {
        drawer(state, payload) {
            state.drawer = payload
        },
        drawerToggle(state) {
            state.drawer = !state.drawer
        },
        addSavedModule(state, payload) {
            state.savedModules.add(payload)
        },
        removeSavedModule(state, payload) {
            state.savedModules.delete(payload)
        }
    },
    actions: {
        saveModule({commit}, payload) {
            commit('addSavedModule', payload)
        },
        removeSavedModule({commit}, payload) {
            commit('removeSavedModule', payload)
        }
    },
    modules: {}
})
