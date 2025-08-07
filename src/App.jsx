import React, { useEffect, useState } from 'react'
import { account } from '../src/lib/appwrite';
import Mainroutes from './routes/Mainroutes'
import Nav from './components/Nav';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { loginuser } from './store/reducers/UserSlice';

const App = () => {
  const dispatch = useDispatch();
  const [IsUserRestored, setIsUserRestored] = useState(false)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if(user){
      dispatch(loginuser(user));
    }
    setIsUserRestored(true);
  }, [dispatch])

  if(!IsUserRestored) return null;
  return (
    <>
      <Nav/>
      <Mainroutes/>
      <Footer/>
    </>
  )
}

export default App