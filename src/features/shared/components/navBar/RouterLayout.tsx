import { Outlet } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";
import { NavBar } from "./NavBar";





interface Props {
  children: React.ReactNode;
}


export const RouterLayout = (props:Props) => {
  return (
    <>
      <NavBarMenu />

      <Outlet />
    </>
  );
};
