"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Brain, Menu, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Fixed: Changed isloading to isAuthLoading
  const { user, isAuthLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Resume", href: "#resume" },
    { name: "Cover Letter", href: "#cover-letter" },
    { name: "ATS Checker", href: "#ats-checker" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="p-2 rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--accent))",
              }}
            >
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">HireSense AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />

            {isAuthLoading ? (
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            ) : (
              <>
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors px-4 py-2"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link
                      href="/login"
                      className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors px-4 py-2"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105"
                    >
                      Create My Resume
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 border-b border-border" : "max-h-0"
        } bg-white/95 dark:bg-black/95 backdrop-blur-lg`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Auth Section */}
          <div className="pt-4 space-y-3 border-t border-border">
            {/* Theme Toggle for Mobile */}

            {isAuthLoading ? (
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            ) : (
              <>
                {isAuthenticated ?  (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium bg-accent rounded-lg text-foreground hover:text-muted-foreground transition-colors px-4 py-2"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors px-4 py-2"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105"
                    >
                      Create My Resume
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
