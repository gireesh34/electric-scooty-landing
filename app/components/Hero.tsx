import ColorSelector from "./ColorSelector";

export default function Hero() {
  return (
    <section className="relative h-[100svh] lg:h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden bg-[#959595]">
        <div className="absolute bottom-0 left-0 right-0 h-36 w-full bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="container mx-auto w-full relative flex items-center justify-center">
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="w-full max-w-[800px] md:max-w-[850px] lg:max-w-[900px]">
            <div className="flex items-center justify-center">
              <div className="w-full">
                <ColorSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}