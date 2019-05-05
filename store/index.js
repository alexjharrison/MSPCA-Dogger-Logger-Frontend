export const state = () => ({
  token: '',
  me: {},
  dogs: [],
  users: []
})

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
    // sort walks by date
    dogs = dogs.map(dog => {
      return {
        ...dog,
        walks: dog.walks.sort(function(a, b) {
          a = new Date(a.created_at)
          b = new Date(b.created_at)
          return a > b ? -1 : a < b ? 1 : 0
        })
      }
    })
    state.dogs = dogs
  },
  setDogPhoto(state, { dogId, newPhoto }) {
    let photo = state.dogs.filter(dog => dog.id === dogId)[0].photo
    photo.filepath = newPhoto.filepath
    photo.id = newPhoto.id
  },
  setUsers(state, users) {
    // state.users, users
    state.users.splice(0, state.users.length, ...users)
  }
}

export const actions = {
  login({ commit, dispatch }, creds) {
    commit('setToken', '')
    return this.$axios.$post('auth/login', creds).then(res => {
      if (!res.user) {
        alert('Wrong username or password')
        return
      }
      commit('setToken', res.token)
      commit('setMe', res.user)
      dispatch('getAllUsers')
      localStorage.setItem('store', JSON.stringify(this.state))
      this.$router.push('/')
    })
  },
  register({ commit, dispatch }, creds) {
    commit('setToken', '')
    this.$axios
      .$post('auth/register', creds)
      .then(res => {
        //set user info & token
        console.log(res)
        commit('setToken', res.token)
        commit('setMe', res.user)
        dispatch('getAllUsers')
        localStorage.setItem('store', JSON.stringify(this.state))
        this.$router.push('/')
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
        localStorage.setItem('store', JSON.stringify(this.state))
      })
      .catch(() => {
        commit('setToken', '')
        this.$router.push('/login')
      })
  },
  getAllUsers({ commit }) {
    return this.$axios.$get('users').then(users => {
      commit('setUsers', users)
      localStorage.setItem('store', JSON.stringify(this.state))
    })
  }
}
