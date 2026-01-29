import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			user: null
		}
	},
	mutations: {
		setUser(state, user) {
			state.user = user
			localStorage.setItem('user', JSON.stringify(user))
		},
		clearUser(state) {
			state.user = null
			localStorage.removeItem('user')
		},
		checkUser(state) {
			const user = localStorage.getItem('user')
			if (user) {
				state.user = JSON.parse(user)
			}
		}
	},
})

export default store
