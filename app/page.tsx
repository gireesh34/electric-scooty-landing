import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <Hero />
      </main>
    </ErrorBoundary>
  );
}