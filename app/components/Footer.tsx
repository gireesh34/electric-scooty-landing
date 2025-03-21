import { Zap } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Safety", href: "#" },
      { label: "Terms", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookie Policy", href: "#" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">REZERO</span>
            </Link>
            <p className="mt-4 text-sm text-gray-900 dark:text-gray-400">
              Revolutionizing urban mobility with cutting-edge electric scooters.
            </p>
          </div>
          
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-base text-primary dark:text-gray-400 hover:text-gray-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-900 dark:text-gray-400">
            © {new Date().getFullYear()} REZERO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}