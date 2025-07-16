import './PaymentResult.scss'; 
import { Link } from "react-router-dom";

export const PaymentFailure: React.FC = () => (
  <div className="payment-result-container">
    <div className="payment-result-card">
      <svg
        className="payment-result-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" fill="#e74c3c" />
        <line x1="22" y1="22" x2="42" y2="42" stroke="#fff" strokeWidth="4" />
        <line x1="42" y1="22" x2="22" y2="42" stroke="#fff" strokeWidth="4" />
      </svg>
      <h1 className="payment-result-title error">Maksu epäonnistui</h1>
      <p className="payment-result-text">
        Valitettavasti maksun käsittelyssä tapahtui virhe. Yritä uudelleen.
      </p>
      <div className="payment-result-actions">
        <Link to="/retry" className="payment-result-button">
          Yritä uudelleen
        </Link>
        <Link to="/" className="payment-result-button outline">
          Etusivulle
        </Link>
      </div>
    </div>
  </div>
);
