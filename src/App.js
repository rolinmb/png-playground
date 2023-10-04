import './App.css';
import React from 'react';
import Home from './components/Home';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from './fbase';

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
      <header className="App-header">
        {user ? /* Below Here Displays When Signed In*/
          <>
            <h1 className='main-header'>PNG Playground</h1>
            <p className='user-email'>{user.email}</p>
            {/*<SignOut />*/}
          </>
          : /* Below Here Displays When Signed Out */
          <> 
            <h1 className='main-header'>Sign In With Google (GMail) To Use PNG Playground</h1>
            {/*<SignIn />*/}
          </>
        }
      </header>
      <main>
        {user ? <Home /> : null}
      </main>
    </div>
  );
}
/*
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <>
      <button className='sign-in' onClick={signInWithGoogle}>Sign in with Gmail</button>
    </>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button className='sign-out' onClick={() => auth.signOut()}>Sign Out</button>
  )
}
*/
export default App;