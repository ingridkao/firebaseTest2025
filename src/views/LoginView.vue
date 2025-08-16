<script setup>
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <div v-if="authStore.user">
    <p>Hi, {{ authStore.user.displayName }}</p>
    <button @click="authStore.logout">
      登出
    </button>
  </div>

  <button @click="authStore.googleLogin">
    Google 登入
  </button>
</template>