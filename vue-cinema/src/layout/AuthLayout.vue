<template>
	<div class="background-auth">
		<div
			class="background-auth__navigation"
			@click="goBack"
		>
			<div class="background-auth__navigation-img">
				<img
					src="../assets/icons/arrow_back.svg"
					alt=""
				>
			</div>
			<div class="background-auth__navigation-title">
				На главную
			</div>
		</div>
		<router-view/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
	router.push('/')
}
</script>

<style lang="scss">
@import '@/assets/scss/style/theme.scss';
  a.auth-form__text-link  {
   color: $color-orange;
  }
</style>
