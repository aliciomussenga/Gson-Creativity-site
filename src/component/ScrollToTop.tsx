import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Salto instantâneo enquanto a opacidade está em 0
  }, [pathname]);

  return null;
}