<script setup>
import { computed } from 'vue'

import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const user = computed(() => authStore.user || null)

const parseDate = (timestamp) => {
  if (!timestamp) return '—'
  const date = new Date(Number(timestamp))
  return date.toLocaleString('zh-TW')
}
</script>

<template>
  <div v-if="user">
    <ul>
      <li>uid:{{ user.uid }}</li>
      <li>email: {{ user.email }}</li>
      <li>emailVerified: {{ user.emailVerified }}</li>
      <li>displayName: {{ user.displayName }}</li>
      <img v-if="user.photoURL" :src="user.photoURL" alt="">
      <li>createdAt: {{ parseDate(user.metadata.createdAt) }}</li>
      <li>lastLoginAt: {{ parseDate(user.metadata.lastLoginAt) }}</li>
      <li>{{ user.providerData }}</li>
    </ul>
    <button @click="authStore.logout">
      登出
    </button>
  </div>

  <button @click="authStore.googleLogin">
    Google 登入
  </button>
</template>
