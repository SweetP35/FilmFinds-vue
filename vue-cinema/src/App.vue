<template>
	<router-view/>
</template>

<script setup>
import '@/assets/scss/style/reset.css'
import '@/assets/scss/style/theme.scss'
import '@/assets/scss/style/fonts.css'
import { useStore } from 'vuex'
const store = useStore()
store.commit('checkUser')


</script>

<style>

</style>
