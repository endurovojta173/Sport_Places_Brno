'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Map as MapIcon, List, Heart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Domov", href: "/", icon: Home },
  { name: "Mapa", href: "/map", icon: MapIcon },
  { name: "Seznam", href: "/list", icon: List },
  { name: "Oblíbené", href: "/favorites", icon: Heart },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* logo */}
        <Link href="/" className="font-bold text-xl text-primary">
          Sport Brno
        </Link>

        {/* links */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => {
            // check current route if match with href
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Button
                key={item.href}
                asChild
                variant="outline"
                size="sm"
                className={`transition-colors flex gap-2 ${
                  isActive ? "bg-primary text-white border-primary" // active state
                    : "bg-white text-black border-input hover:bg-primary hover:text-white" // inactive state
                }`}
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>

        <Button
          aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((prev) => !prev)}
          variant="outline"
          size="icon"
          className="md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden border-t bg-white transition-all ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto flex flex-col gap-3 px-4 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Button
                key={item.href}
                asChild
                variant="outline"
                size="sm"
                className={`justify-start transition-colors flex gap-2 ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-black border-input hover:bg-primary hover:text-white"
                }`}
              >
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
