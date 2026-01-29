<template>
	<template v-if="isLoading">
		<Loader/>
	</template>
	<template v-else>
		<div
			class="back-navigation"
			@click="goBack"
		>
			<div class="back-navigation__img">
				<img
					src="../assets/icons/arrow_back.svg"
					alt=""
				>
			</div>
			<div class="back-navigation__title">
				Назад
			</div>
		</div>
		<div class="container">
			<div class="film-details">
				<div class="film-details__wrapper">
					<div class="film-details__poster">
						<img
							:src="film.coverUrl ? film.coverUrl : film.posterUrl"
							alt=""
						>
					</div>
					<div class="film-details__content">
						<div class="film-details__content-wrapper">
							<div class="film-details__title">
								{{ film.nameRu ? film.nameRu : film.nameOriginal }}
							</div>
							<div
								v-if="auth"
								class="film-details__favorite"
							>
								<img
									:src="isFavorite ? favoriteAddIconSvg : favoriteIconSvg"
									alt="favorite"
									@click="toggleFavorite()"
								>
							</div>
						</div>
						<div class="film-details__info">
							<div class="film-details__slogan">
								{{ film.slogan ? film.slogan : '' }}
							</div>
							<div class="film-details__description">
								{{ film.description ? film.description : 'Нет описания' }}
							</div>
							<div class="film-details__annotation">
								{{ film.editorAnnotation ? film.editorAnnotation : '' }}
							</div>
						</div>
						<div class="film-details__additional">
							<div class="film-details__item">
								Рейтинг: <span>{{ film.ratingKinopoisk }}</span>
							</div>
							<div class="film-details__item">
								Год производства: <span>{{ film.year + 'г.' }}</span>
							</div>
							<div class="film-details__item">
								Длительность: <span>{{ film.filmLength ? film.filmLength + ' мин.' : 'Нет информации' }}</span>
							</div>
							<div class="film-details__item">
								Возраст: <span>{{ film.ratingAgeLimits ? film.ratingAgeLimits.replace('age', '') + '+' : 'Нет информации' }}+</span>
							</div>
							<div class="film-details__item">
								Страны: <span
									v-for="(country, index) in film.countries"
									:key="country"
								>{{ country.country }}{{ film.countries.length - 1 === index ? '' : ', ' }}</span>
							</div>
							<div class="film-details__item">
								Жанры: <span
									v-for="(genre, index) in film.genres"
									:key="genre"
								>{{ genre.genre }}{{ film.genres.length - 1 === index ? '' : ', ' }}</span>
							</div>
						</div>
					</div>
				</div>
				<Swiper
					v-if="imgStill.length > 0"
					title="Кадры из фильма"
					:img-arr="imgStill"
				/>
			</div>
		</div>
	</template>
</template>

<script setup>
import { fetchData } from '@/plugins/http'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import favoriteIconSvg from '../assets/icons/favorite.svg'
import favoriteAddIconSvg from '../assets/icons/favorite_add.svg'
import Swiper from '../components/Swiper.vue'
import Loader from '../components/Loader.vue'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()
const filmId = route.params.id
const film = ref({})
const imgStill = ref([])
const isLoading = ref(true)

const auth = computed(() => store.state.user)

const isFavorite = computed(() => {
	const favorite = (auth.value.favorites || []).find(favorite => favorite.kinopoiskId === film.value.kinopoiskId)
	return favorite !== undefined
})
console.log(filmId)
console.log(auth.value.favorites)

const toggleFavorite = async() => {
	let favorites = auth.value.favorites
	if (isFavorite.value) {
		favorites = favorites.filter(movie => movie.kinopoiskId !== filmId)
	} else {
		favorites.push(film.value)
	}
	await fetchData(`http://localhost:1337/api/users/${auth.value.id}`, 'put', { favorites: favorites })
	store.commit('setUser', { ...auth.value, favorites: favorites })
	isFavorite.value = !isFavorite.value
}

const goBack = () => {
	router.go(-1)
}


const getData = async () => {
	const response = await fetchData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`, 'get', )
	film.value = response.data
	getOtherImages()
	isLoading.value = false
}


const getOtherImages = async () => {
	const responseImgStill = await fetchData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/images`, 'get', { id: filmId, type: 'STILL' })
	const imgArray = [...responseImgStill.data.items]
	imgStill.value = imgArray.slice(0, 7)
}

getData()



</script>
