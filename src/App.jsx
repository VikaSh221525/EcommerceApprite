import React, { useEffect } from 'react'
import { account } from '../src/lib/appwrite';
import Mainroutes from './routes/Mainroutes'
import Nav from './components/Nav';
import Footer from './components/Footer';

const App = () => {
  useEffect(() => {
        async function checkUserSession() {
            try {
                const user = await account.get();
                console.log("User session is active:", user);
            } catch (error) {
                console.log("No active user session:", error.message);
            }
        }

        checkUserSession();
    }, []);
  return (
    <>
      <Nav/>
      <Mainroutes/>
      <Footer/>
    </>
  )
}

export default App