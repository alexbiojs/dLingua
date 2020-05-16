export const state = () => ({
  isAuthorized: false,
  isLoading: true,
  testing: 'testing',
  dialog: true
})

export const mutations = {
  authorized (state){
      state.isAuthorized = !state.isAuthorized
  },
  loading (state){
      state.isLoading = !state.isLoading
  },
  toggleMenu (state){
      state.dialog = !state.dialog
  }
}

export const actions = {
    toggleisLoading (context) {
       context.commit('loading')
    },
    showMenu(context){
        context.commit('toggleMenu')
    }
}
