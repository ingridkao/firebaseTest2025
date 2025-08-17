<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">🔥 Firestore Chat</RouterLink>
    <nav>
      <RouterLink to="/chat">聊天室</RouterLink>
      <RouterLink to="/login">登入</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header{
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0.5rem;
  >nav{
    display: inline-flex;
    gap: 1rem;
  }
}
main{
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
a{
  font-size: 1.5rem;
  color: #666;
  text-decoration: none;
}
</style>
