import { useAuth } from "./authProvider";
import { NavbarDemo } from "../components/NavbarDemo";
import { Navbar2 } from "../components/Navbar2";

const NavbarSwitch = () => {
  const { token } = useAuth();

  return token && token !== null ? <Navbar2 /> : <NavbarDemo />;
};

export default NavbarSwitch;
