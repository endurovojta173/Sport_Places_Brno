//SSR component

import Link from "next/link";
import { ExternalLink, MapPin, Mail, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 mt-auto w-full">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="flex flex-col gap-20 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="text-xl font-semibold text-white">Sport Brno</div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Přehled sportovišť ve statutárním městě Brně. Najdete si sportoviště ve
              svém okolí, zobrazte ho na mapě a naplánujte cestu MHD.
            </p>
          </div>

          <div className="min-w-140px">
            <div className="text-sm font-semibold text-white">Navigace</div>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Domov
              </Link>
              <Link href="/map" className="hover:text-white transition-colors">
                Mapa
              </Link>
              <Link href="/list" className="hover:text-white transition-colors">
                Seznam
              </Link>
              <Link href="/favorites" className="hover:text-white transition-colors">
                Oblíbené
              </Link>
            </nav>
          </div>

          <div className="min-w-220px">
            <div className="text-sm font-semibold text-white">Zdroj dat & kontakt</div>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <a
                href="https://data.brno.cz"
                className="inline-flex items-start gap-2 hover:text-white transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="mt-0.5 h-5 w-5" />
                data.brno.cz - otevřená data města Brna
              </a>
              <div className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-8 w-8" />
                Statutární město Brno, Dominikánské nám. 196/1, 602 00 Brno
              </div>
              <a
                href="mailto:info@brno.cz"
                className="inline-flex items-start gap-2 hover:text-white transition-colors"
              >
                <Mail className="mt-0.5 h-3 w-3" />
                info@brno.cz
              </a>
            </div>
          </div>

          <div className="max-w-xs">
            <div className="text-sm font-semibold text-white">Autoři</div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Aplikaci vytvořili studenti jako školní/komunitní projekt za využití
              otevřených dat města Brna.
            </p>

          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col gap-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Sport Brno. Data poskytuje data.brno.cz pod
            licencí CC BY 4.0.
          </span>
          <span>Vytvořeno s ❤️ v Brně</span>
        </div>
      </div>
    </footer>
  );
}
