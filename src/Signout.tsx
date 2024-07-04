import { useState } from "react";
import { auth } from "./firebaseConfig";

const Signout = () => {
  const [loading, setLoading] = useState(false);
  const handleSignout = () => {
    const { currentUser } = auth;
    if (currentUser) {
      try {
        setLoading(true);
        auth.signOut();
      } catch (error) {
        console.log("Error logging out");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <button
      className="signout-button"
      onClick={handleSignout}
      disabled={loading}
    >
      {loading ? <div className="spinner"></div> : "Signout"}
    </button>
  );
};

export default Signout;
