import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '@/views/errors/NotFound'
import ModuleList from "@/views/ModuleList";
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
        {
            path: '/',
            name: 'module-list',
            component: ModuleList
        },
        {
            path: '/module/:moduleCode',
            name: 'module-page',
            component: ModulePage,
            props: true
        }
    ]
})
