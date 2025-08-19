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
import { account, databases } from './lib/appwrite';

const App = () => {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const preloaderRef = useRef(null);
  const loadingTextRef = useRef(null);

  // const [IsUserRestored, setIsUserRestored] = useState(false)
  // const currentUser = useSelector((state) => state.user.currentUser);


  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("currentUser"));
  //   if (user) {
  //     dispatch(loginuser(user));
  //   }
  //   setIsUserRestored(true);
  // }, [dispatch])

  // useEffect(() => {
  //   if (showMain) {
  //     dispatch(asyncloadproducts())

  //     if (currentUser) {
  //       dispatch(asyncGetWishlist(currentUser.$id));
  //       dispatch(asyncgetcart());
  //     }
  //   }
  // }, [showMain, dispatch, currentUser]);

  useEffect(() => {
    if (!showMain) return;

    const initializeApp = async () => {
      try {
        dispatch(asyncloadproducts());

        const user = await account.get();
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );
        let userDoc = response.documents[0];

        if (!userDoc) {
          console.log("No profile found, creating one for new OAuth user...");
          userDoc = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
            ID.unique(),
            {
              username: user.name, // name -> google
              email: user.email,
              userId: user.$id,
              isAdmin: false
            }
          );
        }
        // Merge the Auth user and the database profile
        const fulluser = { ...user, ...userDoc };
        dispatch(loginuser(fulluser));

        // Fetch data specific to the logged-in user
        dispatch(asyncgetcart());
        dispatch(asyncGetWishlist(fulluser.$id));

      } catch (err) {
        console.log("No active session found.");
      }
    }

    initializeApp()
  }, [showMain, dispatch])

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

  // if (!IsUserRestored) return null;
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