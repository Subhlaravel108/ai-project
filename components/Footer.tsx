import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Text to Speech", href: "/dashboard/text-to-speech" },
    { name: "Voice Cloning", href: "/dashboard/voice-cloning" },
    { name: "Speech to Text", href: "/dashboard/speech-to-text" },
    { name: "Pricing", href: "/pricing" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">V</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">VoiceAI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Next generation AI voice platform powering millions of creators worldwide.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 VoiceAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">GitHub</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
