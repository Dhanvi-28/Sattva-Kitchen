import { Link } from "react-router-dom";
import Button from "../components/common/Button.jsx";

const FEATURES = [
  {
    title: "Personalized picks",
    desc: "A short quiz tunes every suggestion to your taste, diet, Ayurvedic dosha, and TCM constitution.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.6-9.3-9C1 8 2.3 4 6 3c2.4-.6 4.6.3 6 2.3C13.4 3.3 15.6 2.4 18 3c3.7 1 5 5 3.3 9-2.3 4.4-9.3 9-9.3 9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: "Quick & easy",
    desc: "Filter for the time you actually have — 15 minutes or a lazy Sunday.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: "Balanced nutrition",
    desc: "See prep time, macro breakdown, and energetic qualities at a glance before you cook.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.6"/><path d="M12 12l4-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: "Save favorites",
    desc: "Keep a running collection of recipes you want to make again.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 20.5s-7.5-4.6-10-9.3C.5 8 1.8 4.5 5 3.4c2.2-.8 4.5.1 6 2 1.5-1.9 3.8-2.8 6-2 3.2 1.1 4.5 4.6 3 7.8-2.5 4.7-10 9.3-10 9.3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
    ),
  },
];

const MARQUEE_ITEMS = [
  "Ayurvedic Dosha Balance",
  "TCM Thermal Energy",
  "Sattvic Organic Recipes",
  "Gut Agni Optimization",
  "Qi & Essence Tonics",
  "Seasonal Wellness Bowls",
];

const LandingPage = () => {
  return (
    <>
      <section className="container">
        <div className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Ayurveda & TCM Wellness Kitchen</span>
            <h1 className="display-heading hero-title">
              Recipes engineered for your body's energetic balance
            </h1>
            <p className="body-text hero-subtitle">
              Answer a few quick questions about your taste, time, and wellness goals —
              we'll match you with recipes aligned with your mind-body constitution.
            </p>
            <div className="hero-actions">
              <Button as={Link} to="/quiz" variant="primary" size="lg">
                Take the quiz
              </Button>
              <Button as={Link} to="/dashboard" variant="secondary" size="lg">
                Browse dashboard
              </Button>
            </div>
          </div>

          <div className="hero-media">
            <div className="image-frame card-interactive" style={{ height: "420px" }}>
              <img
                src="https://in.pinterest.com/pin/998673286093629049/"
                alt="painting"
                className="image-frame-img"
              />
              <span className="badge badge-gold badge-overlay">✨ AI-Powered Wellness</span>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Marquee Banner (Reference Style) */}
      <div className="marquee-container" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span key={idx} className="marquee-item">
              <span>{item}</span>
              <span className="marquee-dot"></span>
            </span>
          ))}
        </div>
      </div>

      <section className="container section">
        <div className="section-header">
          <div>
            <h2 className="display-heading section-header-title">Why Sattva Kitchen</h2>
            <p className="section-header-subtitle">
              Four pillars every personalized recommendation is built around.
            </p>
          </div>
        </div>

        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <div className="feature-card card-interactive" key={feature.title}>
              <div className="feature-card-icon">{feature.icon}</div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="cta-band">
          <h2 className="display-heading">Ready to discover your ideal recipe?</h2>
          <p className="cta-band-subtitle">
            The wellness quiz takes about one minute. Get curated Ayurvedic & TCM recommendations instantly.
          </p>
          <Button as={Link} to="/quiz" variant="primary" size="lg">
            Start the quiz
          </Button>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
