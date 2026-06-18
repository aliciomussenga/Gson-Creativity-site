import React from "react";
import PageTransition from "../component/PageTransition";
import "../index.css";

const Academy: React.FC = () => {
  return (
    <PageTransition>
      <main className="page-container academy-page" style={{ padding: "3rem 1rem" }}>
        <section className="hero" style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h1 style={{ fontSize: "2.25rem", marginBottom: ".5rem" }}>Gson Academy</h1>
            <p style={{ fontSize: "1.125rem", color: "#f1f1f1", maxWidth: 720 }}>
              Conheça o nosso novo app Gson Academy — cursos em áudio para aprender onde e quando quiser.
              Conteúdos práticos, grátis e pensados para sua rotina.
            </p>

            <ul style={{ marginTop: "1.25rem", lineHeight: 1.6 }}>
              <li><strong>Áudio.</strong> Aprenda em movimento — no trânsito, caminhada ou descanso.</li>
              <li><strong>Prático.</strong> Aulas curtas e objetivas para encaixar no seu dia.</li>
              <li><strong>100% gratuito.</strong> Conteúdo de qualidade para todos.</li>
            </ul>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <a
                href="https://play.google.com/store/apps/details?id=PUT_YOUR_APP_ID"
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block" }}
              >
                <img src="/assets/google-play-badge.png" alt="Google Play" style={{ height: 56 }} />
              </a>

              <a
                href="https://apps.apple.com/app/idPUT_YOUR_APP_ID"
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-block" }}
              >
                <img src="/assets/app-store-badge.png" alt="App Store" style={{ height: 56 }} />
              </a>
            </div>

            <p style={{ marginTop: "1rem", color: "#e6e6e6" }}>
              Observação: substitua os badges em /src/assets por imagens reais e atualize os links com os IDs corretos da Play Store / App Store.
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 280, textAlign: "center" }}>
            {/* placeholder para imagem do app */}
            <div style={{ width: 320, height: 560, margin: "0 auto", borderRadius: 18, background: "linear-gradient(180deg,#0b0b0b,#1a1a1a)", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/assets/gson-academy-phone.png" alt="Gson Academy App" style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: 12 }} />
            </div>
          </div>
        </section>

        <section style={{ marginTop: "2.5rem" }}>
          <h2>O que você pode destacar na página</h2>
          <ol>
            <li>Trechos das principais aulas (áudio ou transcrição curta).</li>
            <li>Prints do app — player, lista de cursos e tela de episódios.</li>
            <li>Depoimentos rápidos de usuários.</li>
            <li>Call-to-action forte com download e link para a Play Store.</li>
          </ol>

          <p style={{ marginTop: "1rem" }}>
            Posso ajudar a montar componentes reutilizáveis (Hero, FeatureList, Badges, Testimonials) e organizar a pasta de assets.
          </p>
        </section>
      </main>
    </PageTransition>
  );
};

export default Academy;
