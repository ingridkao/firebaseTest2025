<script setup>
import { RouterLink, RouterView } from 'vue-router'
/*
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
const testFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'messages'))
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} =>`, doc.data())
    })
  } catch (error) {
    console.error(error);
  }
}
testFirestore()
*/
</script>

<template>
  <main>
    <h1>🔥 Firestore Chat (Vue 3)</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink><br/>
      <RouterLink to="/chat">Chat</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>

<style scoped></style>
