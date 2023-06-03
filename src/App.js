import axios from 'axios';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: process.env.API_KEY,
  authDomain: 'filltours.firebaseapp.com',
  projectId: 'filltours',
};

firebase.initializeApp(firebaseConfig);


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add an observer to handle user authentication state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the observer on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // TODO: handle the response from the server
    } catch (error) {
      // TODO: handle the error
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my app!</h1>
        {user ? (
          <div>
            <p>Upload your image or video to get started.</p>
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <button onClick={handleSignIn}>Sign In with Google</button>
        )}
      </header>
    </div>
  );
        }

export default App;
