import React, { useState } from 'react';
import './Login.css';
import text from '../logo/text.png';
import doodle from '../logo/doodle.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { auth, provider } from '../../firebase';

export default function Login() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="login">
      <div className="login_logo">
        <img src={doodle} />
        <img src={text} />
      </div>
      <button type="submit" onClick={signIn}>
        Sign In
      </button>
      {user && <p>Welcome, {user.displayName}!</p>}
    </div>
  );
}
