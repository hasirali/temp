import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './App.css';
import Header from './components/header/header';
import Sidebar from './components/sidebar/Sidebar';
import Feed from './components/feed/Feed';
import Widgets from './components/widgets/Widgets';
import Login from './components/login/Login';
import ScrollToTop from './components/Scroll/Scroll';

const firebaseConfig = {
    // Your Firebase config goes here
    apiKey: "AIzaSyDUIZWFfiF7sxnvPuaV-Iqndf_MMb1P2T4",
    authDomain: "fb-clone-4cc13.firebaseapp.com",
    projectId: "fb-clone-4cc13",
    storageBucket: "fb-clone-4cc13.appspot.com",
    messagingSenderId: "733191273872",
    appId: "1:733191273872:web:ed0729feecde49b8a50715",
    measurementId: "G-QBYSHR77C7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // Clean up listener
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    firebase.auth().signOut();
  }

  return (
    <div className="App">
      {!user ?
        <Login />
        :
        <>
          <Header user={user} onSignOut={handleSignOut}/>
          <ScrollToTop/>
          <div className='app_body'>
            <Sidebar user={user}/>
            <Feed user={user}/>
            <Widgets />
          </div>
        </>
      }
    </div>
  );
}

export default App;
