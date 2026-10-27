import axios from 'axios'
const TOKEN = import.meta.env.VITE_KINOPOISK_KEY

export const fetchData = async (url, method = 'get', params = {}, useHeaders = true) => {
	try {
		const data = method !== 'get' ? params : undefined
		const config = {
			params: method === 'get' ? params : undefined
		}
		if (useHeaders) {
			config.headers = {
				'X-API-KEY': TOKEN,
				'Content-Type': 'application/json',
			}
		}
		const response = await axios[method](url, { ...config, ...data })
		return response
	} catch (error) {
		console.error('Ошибка при получении данных:', error)
    throw error
	}
}


