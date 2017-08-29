import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    sidebar: false
  },
  mutations: {
    toggleSidebar (state) {
      state.sidebar = !state.sidebar
    }
  }
})

export default store
