<template>
	<div class="container">
		<div class="alert">
			<div class="alert__wrapper">
				<div class="alert__title">
					{{ title }}
				</div>
				<img
					src="/src/assets/icons/sad.svg"
					alt=""
				>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: ''
	}
})
</script>
