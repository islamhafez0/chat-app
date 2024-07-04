import Signout from "./Signout";
import { auth } from "./firebaseConfig";

const Header = () => {
  const { currentUser } = auth;
  const isAuthenticated = !!currentUser;

  return (
    <header className="header">
      <span className="logo">Chat App</span>
      {isAuthenticated && <Signout />}
    </header>
  );
};

export default Header;
