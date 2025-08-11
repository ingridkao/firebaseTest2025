<script setup>
import { ref} from 'vue'
// 調用寫好的邏輯
import { useChat } from '@/composables/useChat'
const { messages, boxRef, send} = useChat('ingrid')

// 登入的uid目前還沒有寫好登入所以先寫死
const myUidRef = ref('ingrid')

const input = ref('')
const onSend = async () => {
  await send(input.value)
  input.value = ''
}

</script>

<template>
  <div class="chat">

    <div class="box" ref="boxRef">
      <div
        v-for="m in messages"
        :key="m.id"
        class="msg"
        :class="{ mine: m.senderId === myUidRef }"
      >
        <div class="meta">
          <span class="name">{{ m.senderName || '匿名' }}</span>
          <span class="time">
            {{ (m.createdAt?.toDate && m.createdAt.toDate()) ? m.createdAt.toDate().toLocaleString() : '...' }}
          </span>
        </div>
        <div class="text">{{ m.text }}</div>
      </div>
    </div>

    <form class="inputBar" @submit.prevent="onSend">
      <input v-model="input" placeholder="說點什麼…" />
      <button class="btn" type="submit">送出</button>
    </form>

  </div>
</template>

<style scoped>
.chat{ border:1px solid #ddd; border-radius:8px; overflow:hidden; }
.toolbar{ display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:#fafafa; border-bottom:1px solid #eee; }
.box{ height:420px; overflow:auto; padding:12px; background:#fff; }
.msg{ margin-bottom:12px; }
.msg .meta{ font-size:12px; color:#888; display:flex; gap:8px; }
.msg .text{ background:#f3f3f3; padding:8px 10px; border-radius:6px; display:inline-block; margin-top:4px; }
.msg.mine .text{ background:#dff1ff; }
.inputBar{ display:flex; gap:8px; padding:10px; border-top:1px solid #eee; background:#fafafa; }
.inputBar input{ flex:1; padding:8px 10px; border:1px solid #ddd; border-radius:6px; }
.btn{ padding:6px 10px; border:1px solid #ddd; border-radius:6px; background:#fff; cursor:pointer; }
.btn:disabled{ opacity:0.6; cursor:not-allowed; }
</style>

