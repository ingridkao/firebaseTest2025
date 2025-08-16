// 包裝Firebase Auth：登入、登出
import { auth } from '@/lib/firebase'
// firebase/auth提供的原生方法
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export function useAuth() {

  const loginWithGoogle  = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  }

  const firebaseLogout = async () => {
    await auth.signOut()
  }

  const subscribeAuthState = (cb) => {
    return onAuthStateChanged(auth, cb)
  }

  return { loginWithGoogle , firebaseLogout, subscribeAuthState }
}
