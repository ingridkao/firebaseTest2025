import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'
const { loginWithGoogle, firebaseLogout, subscribeAuthState } = useAuth()

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const googleLogin = async() => {
    const userRes = await loginWithGoogle()
    user.value = userRes
  }
  const logout = async() => {
    await firebaseLogout()
    user.value = null
  }

  const initAuthListener = () => {
    subscribeAuthState((user) => {
      this.user = user
    })
  }
  return { user, googleLogin, logout, initAuthListener }
})
