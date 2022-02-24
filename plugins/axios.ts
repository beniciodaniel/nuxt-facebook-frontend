import { Plugin } from '@nuxt/types'

const axiosPlugin: Plugin = ({ app, store, redirect }) => {
  app.$axios.onRequest((config) => {
    const token = app.$cookies.get('authToken')

    if (token) {
      config.headers.Authorization = `bearer ${token}`
    }
  })

  app.$axios.onError((error) => {
    if (error.response?.status === 401) {
      app.$cookies.remove('authToken')
    }

    store.dispatch('auth/update', { token: null })

    return redirect('/login')
  })
}

export default axiosPlugin
