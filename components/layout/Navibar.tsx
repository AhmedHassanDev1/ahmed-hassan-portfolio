
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { navLinks } from "@/content/portfolio-content";

function Navibar() {
  return (
    <header className="site-nav">
      <div className="section-shell nav-shell">
        <Link href="#home" className="nav-brand" aria-label="Ahmed Hassan home">
          <span aria-hidden="true">AH</span>
          <strong>Ahmed Hassan</strong>
        </Link>

        <nav aria-label="Primary navigation" className="nav-links">
          {navLinks.slice(0, 5).map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="#contact" className="nav-cta">
          Contact
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

export default Navibar;
