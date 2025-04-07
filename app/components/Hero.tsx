import ColorSelector from "./ColorSelector";

export default function Hero() {
  return (
    <section className="h-screen w-full flex items-center justify-center px-4 relative touch-auto overflow-auto">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="container mx-auto w-full relative flex items-center justify-center">
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="w-full max-w-[800px] md:max-w-[850px] lg:max-w-[900px] relative">
            <div className="flex items-center justify-center">
              <div className="w-full touch-auto">
                <ColorSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}