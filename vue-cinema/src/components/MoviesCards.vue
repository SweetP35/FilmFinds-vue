<template>
	<div class="container">
		<div
			v-if="movies.length > 0"
			class="movie-card__container"
		>
			<MovieCard
				v-for="movie in movies"
				:key="movie.kinopoiskId"
				:movie="movie"
				@click.stop="goToFilmDetails(movie.kinopoiskId)"
			/>
		</div>
	</div>
</template>

<script setup>
import MovieCard from './MovieCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
	movies: {
		type: Array,
		required: true,
		default: () => ([])
	}
})

const goToFilmDetails = (id) => {
	router.push(`/film/${id}`)
}


</script>

<style></style>
