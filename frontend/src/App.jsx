import { Navigate, Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ChatPage from "./pages/ChatPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import  PageLoader from './components/PageLoader'

import {Toaster} from 'react-hot-toast'

function App() {

  const {checkAuth, isCheckingAuth, authUser}= useAuthStore();

  useEffect (()=>{
    checkAuth();
  },[checkAuth]);

  console.log({authUser});

  if (isCheckingAuth) {
    return <PageLoader/>
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* BACKDROP */}
      <div className="absolute inset-0 -z-0 bg-[#120d14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-1/4 left-1/3 size-[28rem] rounded-full bg-rose-300/30 blur-[160px]" />
        <div className="absolute bottom-0 -left-32 size-[26rem] rounded-full bg-fuchsia-400/20 blur-[180px]" />
        <div className="absolute -top-24 right-0 size-[22rem] rounded-full bg-amber-200/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,transparent,rgba(255,255,255,0.03),transparent)]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'}/> } />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={'/'} /> } />
        </Routes>

        <Toaster/>
      </div>
    </div>

  )
}

export default App;

