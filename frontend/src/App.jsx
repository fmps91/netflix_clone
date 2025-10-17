import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import {Routes,Route, useNavigate} from 'react-router-dom'
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Estado de autenticación cambiado:", user);
      
      setUser(user);
      setLoading(false);
      
      if (user) {
        console.log("Usuario loggeado:", user.email);
        navigate('/');
      } else {
        console.log("Usuario no loggeado");
        navigate('/login');
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // O un spinner de carga
  }


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/player/:id' element={<Player/>}/>
    </Routes>
    <ToastContainer theme='dark' />
    </>
  )
}

export default App
