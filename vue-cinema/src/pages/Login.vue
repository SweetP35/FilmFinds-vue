<template>
	<div class="container">
		<form
			class="auth-form"
			@submit.prevent="submitForm"
		>
			<h2 class="auth-form__title">
				Войти
			</h2>
			<div class="auth-form__input-block">
				<div
					class="auth-form__input"
					:class="{ '_active': errors.email }"
				>
					<input
						v-model="email"
						type="text"
						placeholder="Введите ваш эмейл"
						@input="clearEmailError"
					>
				</div>
				<div class="auth-form__error">
					{{ errors.email }}
				</div>
			</div>
			<div class="auth-form__input-block">
				<div
					class="auth-form__input"
					:class="{ '_active': errors.password }"
				>
					<input
						v-model="password"
						type="password"
						placeholder="Введите пароль"
						@input="clearPasswordError"
					>
				</div>
				<div class="auth-form__error">
					{{ errors.password }}
				</div>
			</div>
			<div class="auth-form__btn-block">
				<button
					type="submit"
					class="auth-form__btn"
				>
					Войти
				</button>
				<div class="auth-form__error">
					{{ errors.general }}
				</div>
			</div>
			<div class="auth-form__text">
				Нет аккаунта? <router-link
					to="/auth/registration"
					class="auth-form__text-link"
				>
					Зарегистрируйтесь
				</router-link>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { fetchData } from '@/plugins/http'
import { useRouter } from 'vue-router'
import { error } from '@/localisation/error'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const errors = ref({
	email: '',
	password: '',
	general: ''
})
const isValidEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return re.test(email)
}

const clearEmailError = () => {
	errors.value.email = ''
	errors.value.general = ''
}

const clearPasswordError = () => {
	errors.value.password = ''
	errors.value.general = ''
}

const validateInput = () => {
	errors.value.email = ''
	errors.value.password = ''
	errors.value.general = ''
	if (!email.value) {
		errors.value.email = 'Электронная почта не может быть пустой'
	} else if (!isValidEmail(email.value)) {
		errors.value.email = 'Неверный формат электронной почты'
	}

	if (!password.value) {
		errors.value.password = 'Пароль не может быть пустым'
	} else if (password.value.length < 8) {
		errors.value.password = 'Пароль должен содержать не менее 8 символов'
	}

	if (errors.value.email || errors.value.password) {
		errors.value.general = 'Пожалуйста, исправьте ошибки в форме'
	}
}

const submitForm = async () => {
	validateInput()
	if (!errors.value.email && !errors.value.password) {
		try {
			const response = await fetchData('http://localhost:1337/api/auth/local', 'post', { identifier: email.value, password: password.value }, false)
			store.commit('setUser', response.data.user)
			router.push('/')
		} catch (e) {
			errors.value.general = error(e.response.data.error.name)
		}
	}
}



</script>




