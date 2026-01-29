<template>
	<div class="container">
		<div class="search-bar">
			<h2>{{ title }}</h2>
			<form
				class="search-bar-form"
				@submit.prevent
			>
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Введите название"
					@input="onSearch"
				>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
	title: {
		type: String,
		default: 'Поиск'
	}
})
const emit = defineEmits(['search'])

const searchQuery = ref('')
const onSearch = () => {
	emit('search', searchQuery.value)
}

</script>

<style></style>
