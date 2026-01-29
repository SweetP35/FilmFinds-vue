<template>
	<template v-if="isLoading">
		<Loader/>
	</template>
	<template v-else>
		<SearchBar
			title="Каталог фильмов"
			@search="handleSearch"
		/>
		<SortSelect
			:items="list"
			@click="handlerFilter"
		/>
		<MoviesCards :movies="movies"/>
		<Alert
			v-if="movies.length === 0"
			title="По вашему запросу ничего не найдено"
		/>
		<Pagination
			v-if="movies.length > 0"
			:totalPages="totalPages"
			:current-page="route.query.page"
			@click="changePage"
		/>
	</template>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue'
import SortSelect from '@/components/SortSelect.vue'
import MoviesCards from '@/components/MoviesCards.vue'
import Pagination from '@/components/Pagination.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/Alert.vue'
import { ref } from 'vue'
import { fetchData } from '@/plugins/http.js'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const movies = ref([])
let value = 0
const isLoading = ref(true)
const list = ref([
	{ parameter: 'По порядку', id: 'order', value: '' },
	{ parameter: 'По количеству оценок', id: 'score', value: 'NUM_VOTE' },
	{ parameter: 'По рейтингу', id: 'rating', value: 'RATING' },
	{ parameter: 'По дате выхода', id: 'data', value: 'YEAR' }
])

const totalPages = ref(0)

const handleSearch = (keyword) => {
	clearTimeout(value)
	value = setTimeout(() => {
		getData({ keyword })
	}, 500)
}

const handlerFilter = (filterItem) => {
	getData({ order: filterItem.value })
}



const changePage = (page) => {
	router.push({ path: '/', query: { page: page } })
	getData({ page })
}

const getData = async (params = {}) => {
	const response = await fetchData('https://kinopoiskapiunofficial.tech/api/v2.2/films', 'get', params)
	movies.value = response.data.items
	totalPages.value = response.data.totalPages
	isLoading.value = false
}

if (route.query.page) {
	getData({ page: route.query.page })
} else getData()







</script>

<style></style>
