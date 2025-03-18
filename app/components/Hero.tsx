import ColorSelector from "./ColorSelector";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden bg-[#959595]">
        <div className="absolute bottom-0 left-0 right-0 h-36 w-full bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="container mx-auto w-full relative flex items-center justify-center pb-16">
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="w-full max-w-[1000px]">
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