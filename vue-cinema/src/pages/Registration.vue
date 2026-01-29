<template>
	<div class="container">
		<form
			class="auth-form"
			@submit.prevent="submitForm"
		>
			<h2 class="auth-form__title">
				Регистрация
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
			<div class="auth-form__input-block">
				<div
					class="auth-form__input"
					:class="{ '_active': errors.confirmPassword }"
				>
					<input
						v-model="confirmPassword"
						type="password"
						placeholder="Повторите пароль"
						@input="clearConfirmPasswordError"
					>
				</div>
				<div class="auth-form__error">
					{{ errors.confirmPassword }}
				</div>
			</div>
			<div class="auth-form__btn-block">
				<button
					type="submit"
					class="auth-form__btn"
				>
					Зарегистрироваться
				</button>
				<div class="auth-form__error">
					{{ errors.general }}
				</div>
			</div>
			<div class="auth-form__text">
				Уже есть аккаунт? <router-link
					to="/auth/login"
					class="auth-form__text-link"
				>
					Войти
				</router-link>
			</div>
		</form>
	</div>
</template>

<script setup>
import { fetchData } from '@/plugins/http'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { error } from '@/localisation/error'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({
	email: '',
	password: '',
	confirmPassword: '',
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

const clearConfirmPasswordError = () => {
	errors.value.confirmPassword = ''
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
	if (!confirmPassword.value) {
		errors.value.confirmPassword = 'Подтверждение пароля обязательно.'
	} else if (password.value !== confirmPassword.value) {
		errors.value.confirmPassword = 'Пароли не совпадают'
	}
	if (errors.value.email || errors.value.password || errors.value.confirmPassword) {
		errors.value.general = 'Пожалуйста, исправьте ошибки выше'
	}
}

const submitForm = async () => {
	validateInput()
	if (!errors.value.email && !errors.value.password && !errors.value.confirmPassword) {
		try {
			const response = await fetchData('http://localhost:1337/api/auth/local/register', 'post', { username: email.value, email: email.value, password: password.value }, false)
			console.log(response);
      errors.value.general = 'Форма успешно отправлена'
			router.push('/auth/login')
		} catch (e) {
			errors.value.general = error(e.response.data.error.name)
		}
	}
}

</script>

