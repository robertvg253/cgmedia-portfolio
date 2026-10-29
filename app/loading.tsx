export default function Loading() {
  return (
    <div className="animate-in fade-in duration-200 min-h-screen bg-white pt-32 px-2 flex flex-col items-center w-full">
      {/* Título Simulado */}
      <div className="h-4 w-48 bg-gray-50 animate-pulse mb-12"></div>
      
      {/* Grid Simulado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[5px] w-full max-w-7xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full aspect-square bg-gray-50 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
