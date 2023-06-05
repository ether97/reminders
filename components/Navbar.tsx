"use client";

import { Button } from "./ui/button";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className="flex w-full justify-between  px-4 py-5">
      <Button className="shadow-xl bg-lightbackground">Login</Button>
      <Button className="shadow-xl bg-lightbackground">Register</Button>
    </div>
  );
};

export default Navbar;
