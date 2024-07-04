import { useEffect, useState } from "react";
import Signin from "./Signin";
import ChatRoom from "./ChatRoom";
import { auth } from "./firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import Header from "./Header";

const App = () => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [gettingCurrentUser, setGettingCurrentUser] = useState(true);
  console.log(process.env.REACT_APP_API_KEY);
  console.log(process.env.REACT_APP_AUTH_DOMAIN);
  console.log(process.env.REACT_APP_PROJECT_ID);
  console.log(process.env.REACT_APP_STORAGE_BUCKET);
  console.log(process.env.REACT_APP_MESSAGING_SENDER_ID);
  console.log(process.env.REACT_APP_ID);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setGettingCurrentUser(false);
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const isAuthenticated = !!currentUser;

  if (gettingCurrentUser) {
    return (
      <div className="loader-wrapper">
        <span className="loader"></span>
        Loading....
      </div>
    );
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <>
          <Header />
          <ChatRoom />
        </>
      ) : (
        <Signin />
      )}
    </div>
  );
};

export default App;
