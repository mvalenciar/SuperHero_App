import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const logo = imgRef.current;

    gsap.to(logo, {
      scale: 0.5,
      y: -200,
      opacity: 0,
      scrollTrigger: {
        trigger: logo,
        start: "top top",
        end: "+=700",
        scrub: true,
        markers: true,
      },
    });
  }, []);

  return (
    <section className="min-h-screen flex justify-center items-center overflow-hidden">
      {/* Imagen de fondo */}
      <img
        ref={imgRef}
        src="logo_app.png"
        alt="banner sitio web"
        className="w-[80%] max-w-3xl h-auto drop-shadow-[0_0_15px_cyan]"
      />
    </section>
  );
};
