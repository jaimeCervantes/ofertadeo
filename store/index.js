import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    openedCats: false,
    openedStores: false
  },
  mutations: {
    toggleCategoriesNav (state) {
      state.openedCats = !state.openedCats
      state.openedStores = false
    },
    toggleStoresNav (state) {
      state.openedStores = !state.openedStores
      state.openedCats = false
    }
  }
})

export default store
