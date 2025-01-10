import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '~/views/Home'
import About from '~/views/About'
import TodoApp from '~/views/TodoApp'

Vue.use(VueRouter)

const routes = [
    //config
    {
       path: '/',
       component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/todos',
        redirect: '/todos/all',
        component: TodoApp,
        children: [
            {
                name: 'todos-filter',
                path:':id'
            }
        ]
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})