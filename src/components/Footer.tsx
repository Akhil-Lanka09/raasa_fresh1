// src/components/Footer.tsx  (Server Component)
const WA_NUMBER = '918217729818';

export default function Footer() {
  return (
    <div className="cat-footer">
      <div className="cf-logo">
        <div className="cf-logo-m">Raasa Harvest</div>
        <div className="cf-logo-s">Hyderabad</div>
      </div>
      <div className="cf-mid">
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="cf-link"
        >
          📱 WhatsApp Us
        </a>
      </div>
      <div className="cf-tag">The taste of the harvest</div>
    </div>
  );
}
