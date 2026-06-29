import type { FC } from "react";
import PageTransition from "../component/PageTransition";
import "../index.css";

const highlights = [
  "Trechos das principais aulas (áudio ou transcrição curta).",
  "Prints do app — player, lista de cursos e tela de episódios.",
  "Depoimentos rápidos de usuários.",
  "Call-to-action forte com download e link para a Play Store.",
];

const storeLinks = [
  {
    href: "https://play.google.com/store/apps/details?id=PUT_YOUR_APP_ID",
    src: "/assets/google-play-badge.png",
    alt: "Google Play",
  },
  {
    href: "https://apps.apple.com/app/idPUT_YOUR_APP_ID",
    src: "/assets/app-store-badge.png",
    alt: "App Store",
  },
];

const Academy: FC = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-[#050505] px-4 py-12 text-white sm:px-6 lg:px-8">
        <section className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="w-full max-w-3xl flex-1">
            <h1 className="mb-3 text-4xl font-semibold sm:text-5xl">Gson Academy</h1>
            <p className="max-w-3xl text-lg leading-8 text-[#f1f1f1] sm:text-xl">
              Conheça o nosso novo app Gson Academy — cursos em áudio para aprender onde e quando quiser.
              Conteúdos práticos, grátis e pensados para sua rotina.
            </p>

            <ul className="mt-6 space-y-3 text-base leading-7 text-[#f1f1f1] sm:text-lg">
              <li>
                <strong>Áudio.</strong> Aprenda em movimento — no trânsito, caminhada ou descanso.
              </li>
              <li>
                <strong>Prático.</strong> Aulas curtas e objetivas para encaixar no seu dia.
              </li>
              <li>
                <strong>100% gratuito.</strong> Conteúdo de qualidade para todos.
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {storeLinks.map((link) => (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex transition duration-200 hover:scale-105"
                >
                  <img src={link.src} alt={link.alt} className="h-14 sm:h-16" />
                </a>
              ))}
            </div>

            <p className="mt-4 text-sm leading-7 text-[#e6e6e6] sm:text-base">
              Observação: substitua os badges em /src/assets por imagens reais e atualize os links com os IDs corretos da Play Store / App Store.
            </p>
          </div>

          <div className="flex w-full flex-1 justify-center lg:justify-end">
            <div className="flex h-[560px] w-full max-w-[320px] items-center justify-center rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] p-4 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
              <img
                src="/assets/gson-academy-phone.png"
                alt="Gson Academy App"
                className="max-h-[90%] max-w-[90%] rounded-xl"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_15px_35px_rgba(0,0,0,0.25)]">
          <h2 className="text-2xl font-semibold">O que você pode destacar na página</h2>
          <ol className="mt-5 space-y-3 pl-6 text-base leading-7 text-[#f1f1f1] sm:text-lg">
            {highlights.map((item) => (
              <li key={item} className="list-decimal">
                {item}
              </li>
            ))}
          </ol>

          <p className="mt-6 text-base leading-8 text-[#f1f1f1] sm:text-lg">
            Posso ajudar a montar componentes reutilizáveis (Hero, FeatureList, Badges, Testimonials) e organizar a pasta de assets.
          </p>
        </section>
      </main>
    </PageTransition>
  );
};

export default Academy;
