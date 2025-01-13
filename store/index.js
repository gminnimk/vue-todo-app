import { createStore } from 'vuex'
import todoApp from './todoApp'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    todoApp
  }
})
