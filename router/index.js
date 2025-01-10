import { createRouter, createWebHistory } from 'vue-router' // Vue 3 Router 방식
import Home from '~/views/Home'
import About from '~/views/About'
import TodoApp from '~/views/TodoApp'

const routes = [
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
        path: ':id'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(), // Vue 3에서 History 모드 설정
  routes
})

export default router
