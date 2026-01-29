<template>
	<div class="container">
		<div class="favorite">
			<h2 class="favorite__title">
				Мой список фильмов
			</h2>
		</div>
		<SearchBar
			v-if="movies.length > 0"
			title=""
			@search="handleSearch"
		/>
		<MoviesCards :movies="filteredMovies"/>
		<Alert
			v-if="movies.length === 0"
			title="Вы не добавили ничего в избранное"
		/>
		<Alert
			v-if="filteredMovies.length === 0 && movies.length > 0"
			title="По вашему запросу ничего не найдено"
		/>
		<Pagination
			v-if="pages.length > 1"
			:total-pages="totalPages"
			:current-page="route.query.page"
			@click="changePage"
		/>
	</div>
</template>

<script setup>
import MoviesCards from '@/components/MoviesCards.vue'
import Alert from '@/components/Alert.vue'
import { useStore } from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import { computed, ref, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useStore()
const movies = computed(() => store.state.user.favorites || [])
const filteredMovies = ref([])
const pages = ref([])
const totalPages = computed(() => pages.value.length)
const currentMovies = ref(pages.value[0])







// const isFavorite = computed(() => {
// 	const favorite = movies.value.find(favorite => favorite.kinopoiskId === filteredMovies.value.kinopoiskId)
// 	return favorite !== undefined
// })

// const toggleFavorite = async () => {
// 	if (isFavorite.value) {
// 		movies.value = movies.value.filter(movie => movie.kinopoiskId !== filteredMovies.value.kinopoiskId)
// 	} else {
// 		movies.value.push(filteredMovies.value)
// 	}
// 	await fetchData(`http://localhost:1337/api/users/${user.value.id}`, 'put', { favorites: movies.value })
// 	store.commit('setUser', { ...user.value, favorites: movies.value })
// }

// toggleFavorite()

watch(movies, () => {
	getArrayPages(movies.value)
	console.log(pages.value)

	updateFavorite()
})

const updateFavorite = () => {
	const page = route.query.page
	if (pages.value.length == page) {
		currentMovies.value = pages.value[page - 1]
		filteredMovies.value = pages.value[page - 1]
		return
	}
	changePage(page - 1)
}

const getArrayPages = (moviesArray) => {
	pages.value = []
	for (let i = 0; i < moviesArray.length; i += 10) {
		const pageArray = moviesArray.slice(i, i + 10)
		pages.value.push(pageArray)
	}
}
getArrayPages(movies.value)


const changePage = (page) => {
	router.push({ path: '/favorite', query: { page: page } })
	currentMovies.value = pages.value[page - 1]
	filteredMovies.value = pages.value[page - 1]
}

const handleSearch = (keyword) => {
	if (keyword) {
		filteredMovies.value = currentMovies.value.filter(movie =>
			movie.nameRu ?
				movie.nameRu.toLowerCase().startsWith(keyword.toLowerCase())
				: movie.nameOriginal.toLowerCase().startsWith(keyword.toLowerCase())
		)} else {
		filteredMovies.value = currentMovies.value
	}
}

if (route.query.page) {
	changePage(route.query.page)
} else changePage(1)




</script>
