import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { memo } from "react";

import logo from "/images/logo_app.png";

export const Hero = memo(() => {
  useGSAP(() => {
    gsap.from(".animate-logo-container", {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <section className="min-h-screen flex justify-center items-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="animate-logo-container flex justify-center items-center w-full">
        <img
          src={logo}
          alt="banner sitio web"
          className="w-[80%] max-w-3xl h-auto drop-shadow-[0_0_15px_cyan] animate-pulse"
        />
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
