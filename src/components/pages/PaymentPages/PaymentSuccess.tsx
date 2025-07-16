import { Link } from 'react-router-dom';
import './PaymentResult.scss';

export const PaymentSuccess: React.FC = () => (
  <div className="payment-result-container">
    <div className="payment-result-card">
      <svg
        className="payment-result-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" fill="#fc8437" />
        <path
          d="M20 34 L28 42 L44 26"
          stroke="#fff"
          strokeWidth="4"
          fill="none"
        />
      </svg>
      <h1 className="payment-result-title">Maksu onnistui!</h1>
      <p className="payment-result-text">
        Kiitos ostoksestasi. Maksusi on käsitelty onnistuneesti.
      </p>
      <Link to="/" className="payment-result-button">
        Etusivulle
      </Link>
    </div>
  </div>
);
