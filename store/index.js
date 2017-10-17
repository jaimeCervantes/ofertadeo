import Vuex from 'vuex'

let store = function () {
  return new Vuex.Store({
    state: {
      sidebar: false
    },
    mutations: {
      toggleSidebar (state) {
        state.sidebar = !state.sidebar
      }
    }
  })
}

export default store
