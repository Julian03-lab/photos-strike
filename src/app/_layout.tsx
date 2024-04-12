import { Slot } from "expo-router";
import { SessionProvider } from "../context/ctx";

const Layout = () => {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
};
export default Layout;
