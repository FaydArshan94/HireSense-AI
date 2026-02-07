import { Brain, Mail, Github, Linkedin, Twitter, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-20"
      style={{
        background: 'var(--sidebar)',
        color: 'var(--sidebar-foreground)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                }}
              >
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-xl font-bold "
              
              >
                HireSense AI
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              AI-powered resume analysis platform helping job seekers match their skills with opportunities.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/ArshanFayd6142"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                style={{ background: 'var(--input)' }}
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
              </a>
              <a
                href="https://github.com/FaydArshan94"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                style={{ background: 'var(--input)' }}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
              </a>
              <a
                href="https://www.linkedin.com/in/fayd-arshan-6716a6294/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                style={{ background: 'var(--input)' }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--sidebar-foreground)' }}>Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--sidebar-foreground)' }}>Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#blog" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#partners" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--sidebar-foreground)' }}>Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#documentation" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#api" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  API Reference
                </a>
              </li>
              <li>
                <a href="#status" className="text-sm transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
                  System Status
                </a>
              </li>
              <li>
                <a href="mailto:support@hiresense.ai" className="text-sm transition-colors duration-200 flex items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
                  <Mail className="w-3 h-3" />
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--sidebar-border)' }}></div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <p className="flex items-center gap-1">
              © {currentYear} HireSense AI. Made with 
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline-block mx-1" />
              for job seekers
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#privacy" className="transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
              Privacy Policy
            </a>
            <a href="#terms" className="transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
              Terms of Service
            </a>
            <a href="#cookies" className="transition-colors duration-200" style={{ color: 'var(--muted-foreground)' }}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}