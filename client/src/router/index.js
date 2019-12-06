import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '@/views/errors/NotFound'
import Home from '@/views/Home'
import ModuleList from "@/views/ModuleList";
import SavedModules from "@/views/SavedModules";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: '404',
            component: NotFound
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/modules',
            name: 'module-list',
            component: ModuleList
        },
        {
            path: '/my/modules',
            name: 'saved-modules',
            component: SavedModules
        }
    ]
})
