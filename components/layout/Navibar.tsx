"use client";

import Link from "next/link";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { navLinks } from "@/content/portfolio-content";
import styles from "./Navibar.module.css";

function Navibar() {
  const primaryNavLinks = useMemo(
    () => navLinks.filter((link) => link.label !== "Contact"),
    [],
  );
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setIsMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 12);

      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const updateMobileState = () => {
      setIsMobileNav(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    const sectionIds = primaryNavLinks.map((link) => link.href.slice(1));
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sectionElements.length) return undefined;

    const hashSection = window.location.hash.replace("#", "");
    const syncHashFrame = sectionIds.includes(hashSection)
      ? window.requestAnimationFrame(() => setActiveSection(hashSection))
      : undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.18, 0.32, 0.48, 0.64],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();

      if (syncHashFrame) {
        window.cancelAnimationFrame(syncHashFrame);
      }
    };
  }, [primaryNavLinks]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const previousScrollbarGutter = documentElement.style.scrollbarGutter;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    documentElement.style.scrollbarGutter = "stable";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusableElements = mobileMenuRef.current?.querySelectorAll<
      HTMLAnchorElement | HTMLButtonElement
    >("a[href], button:not([disabled])");

    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      documentElement.style.scrollbarGutter = previousScrollbarGutter;
    };
  }, [closeMenu, isMenuOpen]);

  return (
    <>
      <header
        className="site-nav"
        data-menu-open={isMenuOpen}
        data-scrolled={isScrolled}
      >
        <div className="section-shell nav-shell">
          <Link href="#home" className="nav-brand" aria-label="Ahmed Hassan home">
            <strong>Ahmed Hassan</strong>
          </Link>

          <nav aria-label="Primary navigation" className="nav-links">
            {primaryNavLinks.map((link) => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? "is-active" : undefined}
                  aria-current={isActive ? "location" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {isMobileNav && (
            <button
              ref={menuButtonRef}
              type="button"
              className={`mobile-menu-trigger ${styles.mobileMenuTrigger}`}
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <MenuIcon aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      {isMobileNav && isMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          className={`mobile-menu-overlay ${styles.mobileMenuOverlay}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className={`mobile-menu-shell ${styles.mobileMenuShell}`}>
            <div className={`mobile-menu-top ${styles.mobileMenuTop}`}>
              <Link
                href="#home"
                className={`mobile-menu-brand ${styles.mobileMenuBrand}`}
                onClick={() => closeMenu(false)}
              >
                Ahmed Hassan
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                className={`mobile-menu-close ${styles.mobileMenuClose}`}
                aria-label="Close navigation menu"
                onClick={() => closeMenu()}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <p className={`mobile-menu-kicker ${styles.mobileMenuKicker}`}>
              Portfolio Navigation
            </p>

            <nav
              aria-label="Mobile primary navigation"
              className={`mobile-menu-nav ${styles.mobileMenuNav}`}
            >
              <ul className={`mobile-menu-list ${styles.mobileMenuList}`}>
                {primaryNavLinks.map((link, index) => {
                  const sectionId = link.href.slice(1);
                  const isActive = activeSection === sectionId;

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={[
                          "mobile-menu-link",
                          styles.mobileMenuLink,
                          isActive ? `is-active ${styles.mobileMenuLinkActive}` : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-current={isActive ? "location" : undefined}
                        onClick={() => closeMenu(false)}
                      >
                        <span
                          className={`mobile-menu-index ${styles.mobileMenuIndex}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`mobile-menu-label ${styles.mobileMenuLabel}`}
                        >
                          {link.label}
                        </span>
                        <ArrowUpRight
                          className={`mobile-menu-arrow ${styles.mobileMenuArrow}`}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className={`mobile-menu-footer ${styles.mobileMenuFooter}`}>
              <p>Available for freelance &amp; remote opportunities</p>
              <Link
                href="#contact"
                className={`mobile-menu-cta ${styles.mobileMenuCta}`}
                onClick={() => closeMenu(false)}
              >
                Contact
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navibar;
