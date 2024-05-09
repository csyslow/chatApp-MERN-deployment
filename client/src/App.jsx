import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/HomePage/Home';
import Login from './pages/loginPage/Login';
import SignUp from './pages/signUpPage/SignUp';
import { useAuthContext } from './context/authContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Toaster />
      <Routes>
        <Route path='/' element={authUser? <Home /> : <Navigate to={'/login'}/>} />
        <Route path='/login' element={authUser? <Navigate to={'/'}/> : <Login />} />
        <Route path='/signup' element={authUser? <Navigate to={'/'}/> : <SignUp />} />
      </Routes>
    </div>
  )
}

export default App
