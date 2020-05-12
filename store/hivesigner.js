export const state = () => ({
  isAuthorized: false,
  isLoading: true,
  testing: 'testing'
    
})

export const mutations = {
  authorized (state){
      state.isAuthorized = !state.isAuthorized
  },
  loading (state){
      state.isLoading = !state.isLoading
  }
}

export const actions = {
     toggleisLoading (context) {
       context.commit('loading')
   }
}
