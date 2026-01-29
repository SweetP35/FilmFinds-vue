<template>
	<div class="navigate">
		<div class="container">
			<ul>
				<router-link to="/">
					Главная
				</router-link>
				<li
					v-if="auth"
				>
					<router-link to="/favorite">
						Избранное
					</router-link>
				</li>
				<div
					v-if="auth"
					class="navigate__user"
				>
					<li>
						<img
							src="@/assets/icons/profile.svg"
							alt="Профиль"
							class="navigate__img"
						>
					</li>
					<li>
						{{ user.username }}
					</li>
				</div>
				<router-link
					to="/auth/login"
					@click="logout"
				>
					{{ auth ? 'Выйти' : 'Войти' }}
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'


const store = useStore()
const user = store.state.user

const auth = computed(() => user)
const logout = () => {
	store.commit('clearUser')}

</script>

<style>
</style>
