"use client";

import { useEffect, useState } from "react";
import HeaderNav from "@/components/header/HeaderNav";
import useScrollVisiblity from "@/hooks/useScrollVisiblity";

const Header = () => {
  const isVisible = useScrollVisiblity();

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-card transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <HeaderNav />
    </header>
  );
};

export default Header;
