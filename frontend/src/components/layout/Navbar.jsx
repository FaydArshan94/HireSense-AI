"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Menu, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fixed: Changed isloading to isAuthLoading
  const { user, isAuthLoading, isAuthenticated } = useAuthStore();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 20);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Resume", href: "#resume" },
    // { name: "Cover Letter", href: "#cover-letter" },
    // { name: "ATS Checker", href: "#ats-checker" },
    // { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    // style={{
    //   background: isScrolled ? "rgba(247, 244, 239, 0.85)" : "transparent",
    //   backdropFilter: isScrolled ? "blur(12px)" : "none",
    //   borderBottom: isScrolled ? "1px solid #ede9e0" : "none",
    // }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="p-1.5 rounded-lg flex items-center justify-center"
              style={{
                background: "#ffffff",
              }}
            >
              <img src="/logo.png" className="h-10" alt="" />
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontSize: "1.3rem",
                fontWeight: 900,
                color: "var(--primary)",
                letterSpacing: "-0.02em"
              }}
            >
              HireSense AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {pathname !== "/" && <ThemeToggle />}

            {isAuthLoading ? (
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            ) : (
              <>
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#374151",
                      padding: "8px 16px",
                    }}
                    className="hover:text-black transition-colors"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#374151",
                        padding: "8px 16px",
                      }}
                      className="hover:text-black transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      style={{
                        background: "#0f0f0f",
                        color: "#ffffff",
                        padding: "10px 22px",
                        borderRadius: 10,
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        boxShadow: "0 4px 14px rgba(15,15,15,0.1)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(15,15,15,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 14px rgba(15,15,15,0.1)";
                      }}
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
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#0f0f0f" }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0"
          }`}
        style={{
          background: "rgba(247, 244, 239, 0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "#ede9e0",
        }}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 transition-colors"
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "1rem",
                color: "#374151",
                fontWeight: 500,
              }}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Auth Section */}
          <div className="pt-4 space-y-3 border-t" style={{ borderColor: "#ede9e0" }}>
            {isAuthLoading ? (
              <div className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse" />
            ) : (
              <>
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 transition-colors"
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#0f0f0f",
                    }}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <div className="flex flex-col gap-4 mt-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#374151",
                      }}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center"
                      style={{
                        background: "#0f0f0f",
                        color: "#ffffff",
                        padding: "12px 22px",
                        borderRadius: 10,
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        boxShadow: "0 4px 14px rgba(15,15,15,0.1)",
                      }}
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
