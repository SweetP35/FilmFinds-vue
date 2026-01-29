<template>
	<div class="container">
		<div class="sort-select">
			<div class="sort-select__title">
				Поиск по параметрам
			</div>
			<div
				v-click-outside="outsideClickHandler"
				class="sort-select__wrapper"
				:class="{ '_active': isOpen }"
			>
				<div
					class="sort-select__value"
					@click="toggle"
				>
					<div>{{ value.parameter }}</div>
					<img src="../assets/icons/down_arrow.svg">
				</div>
				<Transition name="dropdown">
					<div
						v-if="isOpen"
						class="sort-select__dropdown"
					>
						<div
							v-for="item in items"
							:key="item.id"
							class="sort-select__item"
							@click="onClick(item)"
						>
							<div>
								{{ item.parameter }}
							</div>
							<img
								v-if="value === item"
								src="../assets/icons/checkmark.svg"
							>
						</div>
					</div>
				</Transition>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
	items: {
		type: Array,
		required: true
	}
})

const emit = defineEmits(['click'])
const isOpen = ref(false)
const value = ref(props.items[0] || null)

const toggle = () => {
	isOpen.value = !isOpen.value
}

const onClick = (item) => {
	value.value = item
	emit('click', value.value)
	isOpen.value = false
}

const outsideClickHandler = () => {
	isOpen.value = false
}




</script>

<style>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
