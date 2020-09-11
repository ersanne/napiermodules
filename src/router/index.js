import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '@/views/errors/NotFound'
// import Home from '@/views/Home'
import ModuleList from "@/views/ModuleList";
import SavedModules from "@/views/SavedModules";
import ModulePage from "@/views/ModulePage";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: '404',
            component: NotFound
        },
        // {
        //     path: '/',
        //     name: 'home',
        //     component: Home
        // },
        {
            path: '/',
            name: 'module-list',
            component: ModuleList
        },
        {
            path: '/modules/saved',
            name: 'saved-modules',
            component: SavedModules
        },
        {
            path: '/module/:moduleCode',
            name: 'module-page',
            component: ModulePage,
            props: true
        }
    ]
})
