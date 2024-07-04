import { useEffect, useState } from "react";
import Signin from "./Signin";
import ChatRoom from "./ChatRoom";
import { auth } from "./firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import Header from "./Header";

const App = () => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [gettingCurrentUser, setGettingCurrentUser] = useState(true);

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
