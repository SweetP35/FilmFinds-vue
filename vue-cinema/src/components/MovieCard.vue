<template>
	<div class="movie-card">
		<div class="movie-card__wrapper">
			<div class="movie-card__img">
				<img
					:src="movie.posterUrlPreview"
					alt=""
				>
			</div>
			<div class="movie-card__content">
				<div>
					<div class="movie-card__title">
						{{ movie.nameRu ? movie.nameRu : movie.nameOriginal }}
					</div>
					<div class="movie-card__info">
						<div
							v-for="country in movie.countries"
							:key="country"
						>
							{{ country.country }},
						</div>
						<div>
							{{ movie.year }},
						</div>
						<div
							v-for="(genre, index) in movie.genres"
							:key="genre"
						>
							{{ genre.genre }}{{ movie.genres.length - 1 === index ? '' : ',' }}
						</div>
					</div>
				</div>
				<div class="movie-card__bottom">
					<div class="movie-card__rating">
						<img
							src="../assets/icons/branch.svg"
							alt="rating"
						>
						<div>
							{{ movie.ratingKinopoisk }}
						</div>
						<img
							src="../assets/icons/branch.svg"
							alt="rating"
						>
					</div>
					<div
						v-if="auth"
						class="movie-card__favorite"
					>
						<img
							:src="isFavorite ? favoriteAddIconSvg : favoriteIconSvg"
							alt="favorite"
							@click.stop="toggleFavorite(movie)"
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import favoriteIconSvg from '../assets/icons/favorite.svg'
import favoriteAddIconSvg from '../assets/icons/favorite_add.svg'
import { useStore } from 'vuex'
import { fetchData } from '@/plugins/http'

const props = defineProps({
	movie: {
		type: Object,
		required: true,
		default: () => ({})
	}
})

const store = useStore()
const auth = computed(() => store.state.user)

const isFavorite = computed(() => {
	const favorite = (auth.value.favorites || []).find(favorite => favorite.kinopoiskId === props.movie.kinopoiskId)
	return favorite !== undefined
})
const toggleFavorite = async() => {
	let favorites = auth.value.favorites
	if (isFavorite.value) {
		favorites = favorites.filter(movie => movie.kinopoiskId !== props.movie.kinopoiskId)
	} else {
		favorites.push(props.movie)
	}
	await fetchData(`http://localhost:1337/api/users/${auth.value.id}`, 'put', { favorites: favorites })
	store.commit('setUser', { ...auth.value, favorites: favorites })
	isFavorite.value = !isFavorite.value
}
</script>
