export const state = () => ({
  token: '',
  me: {},
  dogs: []
})

export const getters = {
  dogById(state, id) {
    // return state.dogs.filter(dog => dog.id === id)
  }
}

export const mutations = {
  setState(state, newState) {
    Object.assign(state, newState)
  },
  setToken(state, token) {
    state.token = token
  },
  setMe(state, me) {
    state.me = me
  },
  setDogs(state, dogs) {
    state.dogs = dogs
  }
}

export const actions = {
  login({ commit }, creds) {
    return this.$axios.$post('auth/login').then(res => {
      console.log(res)
      commit('setToken', res.token)
      commit('setUser', res.user)
      this.$router.push('/')
    })
  },
  register({ commit }, creds) {
    return this.$axios.$post('auth/register').then(res => {
      //set user info & token
      console.log(res)
      commit('setToken', res.token)
      commit('setUser', res.user)
      this.$router.push('/')
    })
  },
  getDogData({ commit }) {
    return this.$axios
      .$get('dogs')
      .then(data => commit('setDogs', data))
      .catch(err => {
        commit('setToken', '')
        this.$router.push('/login')
      })
  }
}
