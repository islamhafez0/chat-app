import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
const Signin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const signinWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
      setTimeout(() => {
        setError("");
      }, 4000);
      console.log("Error during sign in", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in">
      {!error ? (
        <h2>
          <img src="/assets/hey-icon.png" alt="Hey" />
          Welcome!{" "}
        </h2>
      ) : (
        <p className="error">{error}</p>
      )}
      <button onClick={signinWithGoogle} disabled={loading}>
        {loading ? (
          <div className="spinner blue"></div>
        ) : (
          <>
            <img src="/assets/google.svg" alt="Google" />
            Sign in with google
          </>
        )}
      </button>
    </div>
  );
};

export default Signin;
