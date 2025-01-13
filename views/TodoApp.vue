<template>
  <div class="todo-app">
    <div class="todo-app__actions">
      <div class="filters">
        <router-link
          to="all"
          custom v-slot="{ navigate, isActive }">
          <button
            @click="navigate"
            :class="{ 'router-link-active': isActive }">
            모든 항목 ({{ total }})
          </button>
        </router-link>
        <router-link
          to="active"
          custom v-slot="{ navigate, isActive }">
          <button
            @click="navigate"
            :class="{ 'router-link-active': isActive }">
            해야 할 항목 ({{ activeCount }})
          </button>
        </router-link>
        <router-link
          to="completed"
          custom v-slot="{ navigate, isActive }">
          <button
            @click="navigate"
            :class="{ 'router-link-active': isActive }">
            완료된 항목 ({{ completedCount }})
          </button>
        </router-link>
      </div>

      <div class="actions clearfix">
        <div class="float--left">
          <label>
            <input v-model="allDone" type="checkbox" />
            <span class="icon"><i class="material-icons">done_all</i></span>
          </label>
        </div>
        <div class="float--right clearfix">
          <button class="btn float--left" @click="scrollToTop">
            <i class="material-icons">expand_less</i>
          </button>
          <button class="btn float--left" @click="scrollToBottom">
            <i class="material-icons">expand_more</i>
          </button>
          <button class="btn btn--danger float--left" @click="clearCompleted">
            <i class="material-icons">delete_sweep</i>
          </button>
        </div>
      </div>
    </div>

    <div class="todo-app__list">
      <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo" />
    </div>

    <todo-creator class="todo-app__creator" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import scrollTo from 'scroll-to'
import TodoCreator from '~/components/TodoCreator'
import TodoItem from '~/components/TodoItem'

export default {
  components: {
    TodoCreator,
    TodoItem
  },
  computed: {
    // Helpers
    ...mapState('todoApp', [
      'db',
      'todos'
    ]),
    ...mapGetters('todoApp', [
      'total',
      'activeCount',
      'completedCount',
      'filteredTodos'
    ]),
    allDone: {
      get () {
        return this.total === this.completedCount && this.total > 0
      },
      set (checked) {
        this.completeAll(checked)
      }
    }
  },
  watch: {
    $route () {
      this.$store.commit('todoApp/updateFilter', this.$route.params.id)
    }
  },
  created () {
    this.initDB()
  },
  methods: {
    ...mapMutations('todoApp', [
      'updateFilter'
    ]),
    ...mapActions('todoApp', [
      'initDB',
      'completeAll',
      'clearCompleted'
    ]),
    scrollToTop () {
      scrollTo(0, 0, {
        ease: 'linear'
      })
    },
    scrollToBottom () {
      scrollTo(0, document.body.scrollHeight, {
        ease: 'linear'
      })
    }
  }
}
</script>

<style lang="scss">
@use "scss/style" as style;

.filters button.router-link-active {
  background: royalblue;
  color: white;
}
</style>
