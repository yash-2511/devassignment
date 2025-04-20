import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../color-system/color-palette";

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface TopNavigationProps {
  logo?: React.ReactNode;
  title?: string;
  items: NavItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  logo,
  title = "Enterprise DS",
  items,
  actions,
  className,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-700 bg-background shadow-sm",
        className
      )}
      data-component="top-navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            {logo || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            )}
            {title && <span className="text-xl font-semibold">{title}</span>}
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-4"
            aria-label="Main Navigation"
          >
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                    return;
                  }
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  item.isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                aria-current={item.isActive ? "page" : undefined}
                data-state={item.isActive ? "active" : "default"}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions Area (Right Side) */}
          <div className="flex items-center gap-4">
            {/* Additional actions can go here */}
            {actions || <ThemeToggle />}

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-button"
              className="md:hidden p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden border-t border-neutral-200 dark:border-neutral-700",
          !mobileMenuOpen && "hidden"
        )}
      >
        <div className="pt-2 pb-3 space-y-1 px-4">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                if (item.disabled) {
                  e.preventDefault();
                  return;
                }
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                  setMobileMenuOpen(false);
                }
              }}
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-md",
                item.isActive
                  ? "text-primary bg-primary-50 dark:bg-primary-900/20"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              aria-current={item.isActive ? "page" : undefined}
              data-state={item.isActive ? "active" : "default"}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
