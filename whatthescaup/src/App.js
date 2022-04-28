import './App.css';
import { useState } from 'react';
import Home from './Pages/Home';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import Navbar from './Components/Navbar';
import theme from './theme';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, inMemoryPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPasKrGtGmz_rTNfWTP_ZNUkEyMahwXY8",
  authDomain: "whatthescaup.firebaseapp.com",
  databaseURL: "https://whatthescaup-default-rtdb.firebaseio.com",
  projectId: "whatthescaup",
  storageBucket: "whatthescaup.appspot.com",
  messagingSenderId: "332701288732",
  appId: "1:332701288732:web:0826fa3ad7c8eca107d2d9",
  measurementId: "G-CQV9NBYBQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
function App() {
  // github is weird to use with routing, so i'm using a simple workaround
  // only real downside is can't use URLs to link to the non-home pages, but
  // honestly not super important for this application
  const [page, changePage] = useState('home');
  const [mode, setMode] = useState("dark");
  const handleModeChange = () => {
    mode === "dark" ? setMode("light") : setMode("dark");
  }

  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [total, setTotal] = useState(0);
  const [right, setRight] = useState(0);

  const login = () => {
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            setUser(result.user);
            getUser(result.user);
            console.log(result.user)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null)
      console.log("sign out successful")
    })
      .catch((error) => {
        console.log(error)
      });
  }

  function getUser(user) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setBest(snapshot.child("/scaup_best").val());
        setStreak(snapshot.child("/scaup_streak").val());
        setTotal(snapshot.child("/scaup_total").val());
        setRight(snapshot.child("/scaup_right").val());
        console.log(snapshot.val());
      } else {
        updateUser(user.uid, user.displayName, 0, 0, 0, 0);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  function updateUser(userId, user_name, scaup_streak, scaup_right, scaup_total, scaup_best) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      user_name: user_name,
      scaup_streak: scaup_streak,
      scaup_right: scaup_right,
      scaup_total: scaup_total,
      scaup_best: scaup_best
    });
  }

  function updateAnon(scaup_streak, scaup_right, scaup_total, scaup_best) {
    setBest(scaup_best);
    setStreak(scaup_streak);
    setTotal(scaup_total);
    setRight(scaup_right);
  }


  let content;
  if (page === 'home') {
    content = <Home user={user} updateUser={updateUser} getUser={getUser} streak={streak} best={best} total={total} right={right} updateAnon={updateAnon}/>
  } else {
    content = <div>uh oh! page not found.</div>
  }

  return <ThemeProvider theme={theme(mode)}>
    <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
      <Navbar login={login} logout={logout} user={user} mode={mode} handleMode={handleModeChange}/>
    </Box>
    {content}
  </ThemeProvider>
}

export default App;
