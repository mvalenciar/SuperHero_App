export const CustomHeader = () => {
  return (
    <div
      className="
      flex flex-col items-center justify-center
      text-center
      py-12 px-4
    "
    >
      <h1
        className="
        text-4xl md:text-5xl font-bold
        text-white
        tracking-tight
      "
      >
        Bienvenido a la <span className="text-amber-400">Hero App</span>
      </h1>

      <p
        className="
        mt-4 max-w-xl
        text-white/70
        text-base md:text-lg
        leading-relaxed
      "
      >
        Explora y conoce a fondo a héroes y villanos del universo de DC y
        Marvel. Descubre sus poderes, historias y selecciona a tus favoritos.
      </p>
    </div>
  );
};
