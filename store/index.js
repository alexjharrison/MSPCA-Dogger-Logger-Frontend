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
    this.$axios.setToken(token, 'Bearer')
  },
  setMe(state, me) {
    Object.assign(state.me, me)
  },
  setDogs(state, dogs) {
    state.dogs = dogs
  }
}

export const actions = {
  login({ commit }, creds) {
    return this.$axios.$post('auth/login', creds).then(res => {
      if (!res.user) {
        alert('Wrong username or password')
        return
      }
      commit('setToken', res.token)
      commit('setMe', res.user)
      localStorage.setItem('store', JSON.stringify(this.state))
      this.$router.push('/dogs')
    })
  },
  register({ commit }, creds) {
    return this.$axios
      .$post('auth/register', creds)
      .then(res => {
        //set user info & token
        console.log(res)
        commit('setToken', res.token)
        commit('setUser', res.user)
        localStorage.setItem('store', JSON.stringify(this.state))
        this.$router.push('/dogs')
      })
      .catch(() => {
        alert('Email already registered')
      })
  },
  getDogData({ commit }) {
    return this.$axios
      .$get('dogs')
      .then(data => {
        commit('setDogs', data)
        localStorage.setItem('store', JSON.stringify(this.state))
      })
      .catch(err => {})
  },
  getMyData({ commit, dispatch }) {
    return this.$axios
      .$get('user')
      .then(data => {
        commit('setMe', data)
        dispatch('getDogData')
      })
      .catch(() => {
        commit('setToken', '')
        this.$router.push('/login')
      })
  }
}
