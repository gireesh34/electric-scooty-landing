"use client";

import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">REZERO</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#features" className="text-primary hover:text-primary/80 px-3 py-2 rounded-md text-sm font-medium">
                Features
              </Link>
              <Link href="#services" className="text-primary hover:text-primary/80 px-3 py-2 rounded-md text-sm font-medium">
                Services
              </Link>
              <Link href="#contact" className="text-primary hover:text-primary/80 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
              <Link 
                href="#order" 
                className="bg-black text-white hover:bg-black/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Order Now
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <Link 
              href="#order" 
              className="bg-black text-white hover:bg-black/90 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            >
              Order Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary/80 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="text-primary hover:text-primary/80 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#services"
              className="text-primary hover:text-primary/80 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-primary hover:text-primary/80 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="#order"
              className="bg-black text-white hover:bg-black/90 block px-4 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}