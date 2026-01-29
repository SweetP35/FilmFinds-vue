<template>
	<div class="container">
		<div class="pagination">
			<template v-if="currentPage.value > 2 && totalPages > 3">
				<div
					class="pagination__item"
					@click="changePage(1)"
				>
					1
				</div>
				<div>...</div>
			</template>
			<div
				v-for="item in pages"
				:key="item"
				class="pagination__item"
				:class="{ '_active': item === currentPage.value }"
				@click="changePage(item)"
			>
				{{ item }}
			</div>
			<template v-if="currentPage.value < totalPages && currentPage.value < totalPages - 1">
				<div>...</div>
				<div
					class="pagination__item"
					@click="changePage(totalPages)"
				>
					{{ totalPages }}
				</div>
			</template>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
const props = defineProps({
	totalPages: {
		type: Number,
		required: true
	},
	currentPage: {
		type: Number,
		default: 1
	}
})
const emit = defineEmits(['click'])
const currentPage = reactive({ value: +props.currentPage })
const changePage = (page) => {
	currentPage.value = page
	emit('click', page)
}

const pagesArray = ref([])
const finishedPages = ref([])
const getArrayPages = (totalPages) => {
	for (let i = 1; i <= totalPages; i++) {
		if (i > 3) break
		pagesArray.value.push(i)
		finishedPages.value.push((totalPages + 1) - i)
	}
	finishedPages.value.reverse()
}
getArrayPages(props.totalPages)

const pages = computed(() => {
	if (currentPage.value < 2) {
		return pagesArray.value
	}
	if (currentPage.value >= props.totalPages) {
		return finishedPages.value
	}
	const prevPage = currentPage.value - 1
	const nextPage = currentPage.value + 1
	const result = [prevPage, currentPage.value, nextPage]
	return result
})





</script>
<!-- // const pages = computed(() => {
// 	if (currentPage.value < 2 && props.totalPages > 3) {
// 		return [1, 2, 3]
// 	}
// 	if (currentPage.value >= props.totalPages) {
// 		return [props.totalPages - 2, props.totalPages - 1, props.totalPages]
// 	}
// 	const prevPage = currentPage.value - 1
// 	const nextPage = currentPage.value + 1
// 	const result = [prevPage, currentPage.value, nextPage]
// 	return result
// })
// const emit = defineEmits(['click'])
// const currentPage = reactive({ value: +props.currentPage })

// const changePage = (page) => {
// 	currentPage.value = page
// 	emit('click', page)
// }




//  <template v-if="currentPage.value > 2">
//   <div
//     class="pagination__item"
//     @click="changePage(1)"
//   >
//     1
//   </div>
//   <div>
//     ...
//   </div>
// </template>
// <div
//   v-for="item in pages"
//   :key="item"
//   class="pagination__item"
//   :class="{ '_active': item === currentPage.value }"
//   @click="changePage(item)"
// >
//   {{ item }}
// </div>
// <template v-if="currentPage.value < totalPages && currentPage.value < totalPages - 1">
//   <div>
//     ...
//   </div>
//   <div
//     class="pagination__item"
//     @click="changePage(totalPages)"
//   >
//     {{ totalPages }}
//   </div>
// </template> -->
