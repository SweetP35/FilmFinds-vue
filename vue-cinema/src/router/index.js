import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('../layout/MainLayout.vue'), children: [
		{ path: '/', component: () => import('@/pages/home.vue') },
		{ path: '/film/:id', component: () => import('@/pages/FilmDetails.vue') },
		{ path: '/favorite', component: () => import('@/pages/Favorite.vue') }
	] },
	{ path: '/auth', component: () => import('../layout/AuthLayout.vue'), children: [
		{ path: '/auth/login', component: () => import('@/pages/Login.vue') },
		{ path: '/auth/registration', component: () => import('@/pages/Registration.vue') }
	] }


]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
