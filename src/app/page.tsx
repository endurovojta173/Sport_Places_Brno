import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, ArrowRight, Activity, Link as LinkIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-white">
      {/* Hero section */}
      <section
        className="relative w-full bg-red-700 bg-cover bg-center bg-no-repeat bg-blend-multiply pt-24 pb-32 flex justify-center"
        style={{ backgroundImage: "url('/pics/hero.jpg')" }}
      >
        <div className="w-full max-w-6xl px-4 md:px-8 relative z-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm mb-8">
              <LinkIcon className="h-4 w-4" />
              Otevřená data města Brna
            </div>

            {/* Hero header and text */}
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Sportoviště <br /> města Brna
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 leading-relaxed">
              Prozkoumejte všechna sportoviště v Brně na interaktivní mapě. 
              Najděte nejbližší MHD zastávky a uložte si oblíbená místa.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-white text-red-700 hover:bg-slate-100 font-semibold h-12 px-8 rounded-xl">
                <Link href="/map">
                  <MapPin className="mr-2 h-5 w-5" />
                  Zobrazit mapu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm h-12 px-8 rounded-xl">
                <Link href="/favorites">
                  <Heart className="mr-2 h-5 w-5" />
                  Oblíbené
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full max-w-6xl px-4 md:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Activity className="h-7 w-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900">800+</div>
              <div className="text-sm font-medium text-slate-500">Sportovišť v Brně</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <MapPin className="h-7 w-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900">1000+</div>
              <div className="text-sm font-medium text-slate-500">Zastávek veřejné dopravy</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Heart className="h-7 w-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900">30+</div>
              <div className="text-sm font-medium text-slate-500">Sportovních disciplín</div>
            </div>
          </div>
        </div>
      </section>

      {/* How does it work section*/}
      <section className="w-full max-w-6xl px-4 md:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Jak to funguje?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Jednoduše prozkoumejte sportoviště, najděte ty nejbližší a uložte si je.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col rounded-3xl bg-red-50/50 p-8 border border-red-100/50">
            <div className="text-6xl font-black text-red-100 mb-6">01</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Prozkoumejte mapu</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Otevřete interaktivní mapu a prohlédněte si všechna sportoviště v Brně.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col rounded-3xl bg-red-50/50 p-8 border border-red-100/50">
            <div className="text-6xl font-black text-red-100 mb-6">02</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Zobrazte detail</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Klikněte na sportoviště a zjistěte adresu, typ, otevírací dobu a nejbližší MHD.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col rounded-3xl bg-red-50/50 p-8 border border-red-100/50">
            <div className="text-6xl font-black text-red-100 mb-6">03</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Uložte oblíbené</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Označte sportoviště jako oblíbené a mějte je vždy po ruce.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action Seciton */}
      <section className="w-full max-w-6xl px-4 md:px-8 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl bg-red-700 p-10 md:p-14 shadow-2xl">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-3">Připraveni sportovat?</h2>
            <p className="text-red-100">Najděte si sportoviště přímo na mapě a jděte na to!</p>
          </div>
          <Button asChild size="lg" className="bg-white text-red-700 hover:bg-slate-100 font-semibold h-12 px-10 rounded-xl shrink-0">
            <Link href="/map">
              <MapPin className="mr-2 h-5 w-5" />
              Otevřít mapu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Pre-footer */}
      <div className="w-full bg-slate-50 py-6 text-center text-xs font-medium text-slate-400 border-t">
        Data poskytuje <a href="https://data.brno.cz" target="_blank" rel="noreferrer" className="text-red-600 hover:underline">data.brno.cz</a> • Sport Brno {new Date().getFullYear()}
      </div>
    </main>
  );
}