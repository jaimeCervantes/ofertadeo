import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    sidenav: true,
    counter: 0
  },
  mutations: {
    toggleSideNav (state) {
      console.log(state.sidenav)
      if (state.sidenav) {
        state.sidenav = false
      } else {
        state.sidenav = true
      }
    },
    increment (state) {
      state.counter++
    }
  }
})

export default store
