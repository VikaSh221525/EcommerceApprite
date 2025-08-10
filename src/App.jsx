import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import Mainroutes from './routes/Mainroutes'
import Nav from './components/Nav';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser } from './store/reducers/UserSlice';
import { asyncGetWishlist } from './store/actions/WishlistAction';
import { asyncgetcart } from './store/actions/CartAction';
import { asyncloadproducts } from './store/actions/ProductAction';

const App = () => {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const preloaderRef = useRef(null);
  const loadingTextRef = useRef(null);

  const [IsUserRestored, setIsUserRestored] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      dispatch(loginuser(user));
    }
    setIsUserRestored(true);
  }, [dispatch])

  useEffect(() => {
    if (showMain) {
      dispatch(asyncloadproducts())

      if (currentUser) {
        dispatch(asyncGetWishlist(currentUser.$id));
        dispatch(asyncgetcart());
      }
    }
  }, [showMain, dispatch, currentUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      })

    }, 20);
    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    if (count === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          setShowMain(true)
        }
      });
      tl.to(preloaderRef.current, {
        y: '-100vh',
        opacity: 0,
        duration: 1.5,
        ease: 'power3.inOut'
      });
      tl.to(loadingTextRef.current, {
        y: '50px',
        opacity: 0,
        duration: 1.5,
        ease: 'power3.inOut'
      }, '<')

    }
  }, [count])

  if (!IsUserRestored) return null;
  return (
    <>
      {!showMain && (
        <div className='bg-gray-100 w-full h-screen overflow-hidden'>
          <div ref={preloaderRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <DotLottieReact
              src="/cart-loader.lottie"
              loop
              autoplay
              style={{ width: 350, height: 350 }}
            />
          </div>
          <div ref={loadingTextRef} className='text-2xl font-semibold absolute bottom-10 right-10 z-50 text-gray-700'>
            Loading Store... {count}%
          </div>
        </div>
      )}

      {showMain && (
        <div className="App">
          <Nav />
          <Mainroutes />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App