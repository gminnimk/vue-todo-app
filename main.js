import { createApp } from 'vue' // Vue 3 방식
import App from './App.vue' // 파일 확장자는 명시적으로 사용
import router from './router'
import store from './store'

const app = createApp(App) // Vue 애플리케이션 생성

app.use(router) // VueRouter 설치
app.use(store)

app.mount('#app') // 마운트
