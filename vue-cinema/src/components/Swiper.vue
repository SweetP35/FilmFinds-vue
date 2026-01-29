<template>
	<div class="container">
		<div class="swiper-slides">
			<div class="swiper-slides__title">
				{{ title }}
			</div>
			<Swiper
				ref="swiper"
				:slides-per-view="1"
				:space-between="30"
				:navigation="{
					prevEl: prev,
					nextEl: next,
				}"
				:modules="[Navigation]"
			>
				<swiper-slide
					v-for="(img,index) in imgArr"
					:key="index"
					class="swiper-slides__wrapper"
				>
					<img
						class="swiper-slides__img"
						:src="img.imageUrl"
						alt="Still Image"
					>
				</swiper-slide>
				<div class="swiper-slides__arrows-wrapper">
					<div
						ref="prev"
						class="swiper-slides__arrow _prev"
					>
						<img
							src="../assets/icons/arrow.svg"
							alt=""
						>
					</div>
					<div
						ref="next"
						class="swiper-slides__arrow _next"
					>
						<img
							src="../assets/icons/arrow.svg"
							alt=""
						>
					</div>
				</div>
			</Swiper>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules' // Импортируйте Navigation
import 'swiper/css'
import 'swiper/css/navigation' // Импортируйте CSS для навигации

const swiper = ref(null)


defineProps({
	title: {
		type: String,
		default: ''
	},
	imgArr: {
		type: Array,
		default: () => []
	}
})


const prev = ref(null)
const next = ref(null)

</script>

