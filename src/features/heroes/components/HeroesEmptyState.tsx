export const HeroesEmptyState = () => {
  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">
          No se encontraron héroes
        </h2>

        <p className="text-slate-300 leading-relaxed">
          No se encuentra entre nuestros datos héroes que coincidan con estos
          términos de búsqueda.
        </p>
      </div>
    </div>
  );
};
