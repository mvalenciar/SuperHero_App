import logo from "/images/logo_app.png";

export const Hero = () => {
  return (
    <section className="min-h-screen flex justify-center items-center overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src={logo}
        alt="banner sitio web"
        className="w-[80%] max-w-3xl h-auto drop-shadow-[0_0_15px_cyan] animate-pulse"
      />
    </section>
  );
};
