import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { setDoc, doc, getDoc } from "firebase/firestore";


export function useAuthentication() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid)
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUser(null); // Set user state to null
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribeFromAuthStateChanged();
  }, []);

  // Function to sign up a new user
  const signup = async (email, password, phoneNumber, address, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      setIsAuthenticated(true); // Set isAuthenticated to true after successful signup
      setUser(userCredential.user);

      // Get the newly created user's UID
      const userId = userCredential.user.uid;

      // Create a document for the user in the users collection

      // Set user data in the document
      await setDoc(doc(db, "users", userCredential?.user?.uid), {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        userId: userCredential?.user.uid
      });

      return {userId: userCredential.user.uid, ...userCredential.user };
    } catch (error) {
      // Customize the error message
      let errorMessage = 'Signup failed';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      // console.error(errorMessage, error);
      throw Error(errorMessage);
    }
  };


  const updateUserData = async (userId, username) => {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
  
  
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...data, username: data.username, phoneNumber: data.phoneNumber, userId: data.uid });
      return data; // Return the fetched user data
    } else {
      console.error('User data not found');
      return null; // Return null if user data does not exist
    }
  };

  // Function to log in an existing user
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true); // Set isAuthenticated to true after successful login
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      // Customize the error message
      let errorMessage = 'Login failed';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials provided. Please check your email and password and try again.';
      } else {
        errorMessage = 'An error occurred while logging in. Please try again.';
      }
      // console.error(errorMessage, error);
      throw Error(errorMessage);
    }
  };
  
  // Function to log out the current user
  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false); // Set isAuthenticated to false after successful logout
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error.message);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    updateUserData,
    signup,
    login,
    logout,
  };
}
