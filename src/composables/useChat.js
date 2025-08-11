// 訊息監聽、送訊息、分頁
import { ref, nextTick } from 'vue'
// firebase/firestore提供的原生方法
// 如果需要了解參數和用法需查詢官方文件
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
// 已初始化連線到資料庫
import { db } from '@/lib/firebase'

export function useChat(uidRef) {
  const pageSize = 5      // 每次僅顯示五筆訊息
  const messages = ref([])// 在UI顯示的訊息列表
  const boxRef = ref(null)// 給組件div綁定用，用來拉到底

  // 指定一個 Firestore 資料庫中的集合（Collection）
  const col = collection(db, 'messages')

  // 儲存從 Firebase Firestore 的 onSnapshot 方法中回傳的快照對象。
  let snapshot = null

  const listen = () => {
    // unsub(): onSnapshot提供的方法，呼叫 unsub() 可以停止監聽
    if (snapshot) unsub()

    // 先清空UI上原有的訊息
    messages.value = []

    // query: 設定查詢條件，篩選並排序資料
    //  - orderBy:以生成時間作為排序
    //  - limit: 呈現X筆
    const q = query(col, orderBy('createdAt', 'desc'), limit(pageSize))

    // 開始監聽
    // onSnapshot方法: 實時監聽資料變化的方法，當資料庫中的資料變更時，它會觸發回調並將變更後的資料提供給你。
    // 變數snapshot: 儲存從 Firebase Firestore 的 onSnapshot 方法中回傳的快照對
    snapshot = onSnapshot(q, snap => {
      const list = []
      // 整理快照資料: 
      snap.forEach(d => list.push({ id: d.id, ...d.data() }))
      // 反轉資料順序：將新訊息顯示在畫面底部
      messages.value = list.reverse()
      scrollToBottomSoon()
    })
  }

  const send = async (text) => {
    // 將輸入文字的前後空白去掉
    const t = (text || '').trim()
    if (!t) return

    // TODO: 在這邊可以加入輸入驗證

    // 加入訊息在聊天室
    // addDoc: 將一條新資料加入 Firestore 中的集合，並自動生成一個唯一的 ID。
    await addDoc(col, {
      text: t,
      createdAt: serverTimestamp(),
      senderId: uidRef?.value || '12345',
      senderName: `User-${(uidRef?.value || '12345').slice(0, 5)}`
    })
    scrollToBottomSoon()
  }

  // 等待 Vue 更新 DOM 後將畫面滾動到底部
  const scrollToBottomSoon = async () => {
    //  nextTick: 等待 Vue 更新 DOM的方法
    await nextTick()
    const el = boxRef.value
    if (el) el.scrollTop = el.scrollHeight
  }

  // 一進來就監聽
  listen()

  return { messages, boxRef, send }
}