import React,{ useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout} from './store/authSlice'
import { Header, Footer} from './components/index'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
 const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))


  },[])

  return !loading ? (
    <div className='text-white bg-gray-400'>
     <div >
      <Header />
      <main>
       <Outlet />
        
      </main>
      <Footer />
     </div>
    </div>
  ) : null
}

export default App
