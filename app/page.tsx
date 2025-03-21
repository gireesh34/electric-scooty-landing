import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Specifications from "./components/Specifications";
import Design from "./components/Design";
import Performance from "./components/Performance";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 -z-10" />
      
      {/* Animated background patterns */}
      <div className="fixed inset-0 opacity-40 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.1)_55%,transparent_55%)] animate-pulse dark:bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.05)_55%,transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Specifications />
        <Design />
        <Performance />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>
      </main>
    </ErrorBoundary>
  );
}