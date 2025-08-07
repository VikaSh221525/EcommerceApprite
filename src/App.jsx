import React, { useEffect } from 'react'
import Mainroutes from '../routes/Mainroutes'
import { account } from '../src/lib/appwrite';

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
    <Mainroutes/>
  )
}

export default App