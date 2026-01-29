import axios from 'axios'
const TOKEN = '576928f2-fadc-479f-83a5-27b778ea6454'

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
		console.log(params)
		const response = await axios[method](url, { ...config, ...data })
		return response
	} catch (error) {
		console.error('Ошибка при получении данных:', error)
    throw error
	}
}


