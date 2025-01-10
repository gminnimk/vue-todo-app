import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _find from 'lodash/find'
import _assign from 'lodash/assign'

export default {
    namespaced: true,
    state: () => ({
        db: null,
        todos: []  
    }),
    getters: {
        total (state) {
            return state.todos.length
          },
          activeCount (state) {
            return state.todos.filter((todo) => !todo.done).length
          },
          completedCount (state, getters) {
            return getters.total - getters.activeCount
          }
    },
    mutations: {
        assignDB (state, db) {
          state.db = db
        },
        createDB (state, newTodo) { 
          state.db
            .get('todos') // lodash
            .push(newTodo) // lodash
            .write() // lowdb
        },
        updateDB (state, { todo, value }) {
          state.db
              .get('todos')
              .find({ id: todo.id })
              .assign(value)
              .write()
        },
        assignTodos (state, todos) {
            state.todos = todos
        },
        pushTodo (state, newTodo) {
            state.todos.push(newTodo)
        },
        assignTodo (state, { foundTodo, value }) {
          _assign(foundTodo, value)
        }
    },
    actions: {
        initDB ({ state, commit }) {
            const adapter = new LocalStorage('todo-app')
            // state.db = lowdb(adapter)
            commit('assignDB', lowdb(adapter))

            console.log(state.db)
      
            const hasTodos = state.db.has('todos').value()
      
            if (hasTodos) {
              // state.todos = _cloneDeep(state.db.getState().todos)
              commit('assignTodos', _cloneDeep(state.db.getState().todos))
            } else {
              // Local DB 초기화
              state.db
                .defaults({
                  todos: []
                })
                .write()
            }
      
            // 기본 데이터 초기화
            if (!state.db.has('todos').value()) {
              state.db
                .set('todos', []) // 빈 배열로 초기화
                .write() // 데이터 저장
            }
          },
          createTodo ({ state, commit }, title) {
            const newTodo = {
              id: cryptoRandomString({ length: 10 }),
              title,
              createdAt: new Date(),
              updatedAt: new Date(),
              done: false
            }
      
            // Create DB
            commit('createDB', newTodo)
      
            // Craete Client
            commit('pushTodo', newTodo)
          },
          updateTodo ({ state, commit }, { todo, value }) { 
            // Update DB
            commit('updateDB', { todo, value })
      
            const foundTodo = _find(state.todos, { id: todo.id })
            commit('assignTodo', { foundTodo, value })
          },
    }
}