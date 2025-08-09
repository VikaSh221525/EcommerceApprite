import React, { useEffect, useState } from 'react'
import { account } from '../src/lib/appwrite';
import Mainroutes from './routes/Mainroutes'
import Nav from './components/Nav';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser } from './store/reducers/UserSlice';
import { asyncGetWishlist } from './store/actions/WishlistAction';

const App = () => {
  const dispatch = useDispatch();
  const [IsUserRestored, setIsUserRestored] = useState(false)
  const currentUser = useSelector((state)=> state.user.currentUser);


  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if(user){
      dispatch(loginuser(user));
    }
    setIsUserRestored(true);
  }, [dispatch])

  useEffect(() => {
    if(currentUser){
      dispatch(asyncGetWishlist(currentUser.$id));
    }
  }, [dispatch, currentUser])

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