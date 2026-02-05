import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function ChatPage() {

const {logout} = useAuthStore();

const handleLogout = () =>{
  logout();
}

  return (
    <>
      <div className=''>ChatPage</div>
      <button className='w-40 bg-slate-500 text-white rounded-lg py-2.5 font-medium hover:bg-red-100 hover:text-black focus:ring-2 focus:ring-cyan-100' type='submit' onClick={handleLogout}>Logout</button>
    </>
  )
}

export default ChatPage