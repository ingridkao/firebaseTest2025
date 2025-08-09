// 訊息監聽、送訊息、分頁
// 單一公共聊天室
import { ref, nextTick } from 'vue'
import { db } from '@/lib/firebase'
import {
  collection, addDoc, serverTimestamp, query,
  orderBy, limit, onSnapshot, startAfter, getDocs
} from 'firebase/firestore'

export function useChat(uidRef) {
  const messages = ref([])
  const loadingMore = ref(false)
  const pageSize = 5
  const boxRef = ref(null) // 給外層綁定，用來拉到底
  let unsub = null
  let lastVisible = null

  const col = collection(db, 'messages') // ← 單一公共聊天室

  const listen = () => {
    // 先清空
    if (unsub) unsub()
    messages.value = []
    lastVisible = null

    const q = query(col, orderBy('createdAt', 'desc'), limit(pageSize))
    unsub = onSnapshot(q, snap => {
      const list = []
      snap.forEach(d => list.push({ id: d.id, ...d.data() }))
      messages.value = list.reverse()
      lastVisible = snap.docs[snap.docs.length - 1] || null
      scrollToBottomSoon()
    })
  }

  const loadMore = async () => {
    if (loadingMore.value || !lastVisible) return
    loadingMore.value = true
    try {
      const q = query(col, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(pageSize))
      const snap = await getDocs(q)
      const list = []
      snap.forEach(d => list.push({ id: d.id, ...d.data() }))
      messages.value = list.reverse().concat(messages.value)
      lastVisible = snap.docs[snap.docs.length - 1] || null
    } finally {
      loadingMore.value = false
    }
  }

  const send = async (text) => {
    const t = (text || '').trim()
    if (!t) return
    // 可以加入輸入驗證
    await addDoc(col, {
      text: t,
      createdAt: serverTimestamp(),
      senderId: uidRef?.value || '12345',
      senderName: `User-${(uidRef?.value || '12345').slice(0, 5)}`
    })
    scrollToBottomSoon()
  }

  const scrollToBottomSoon = async () => {
    await nextTick()
    const el = boxRef.value
    if (el) el.scrollTop = el.scrollHeight
  }

  // 一進來就監聽
  listen()

  return { messages, send, loadMore, loadingMore, boxRef }
}