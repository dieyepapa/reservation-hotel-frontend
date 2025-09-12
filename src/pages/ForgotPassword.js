import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique de réinitialisation de mot de passe
    console.log('Reset password for:', email);
    // Pour l'instant, on redirige vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-icon"></div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#282828' }}>
              RED PRODUCT
            </span>
          </div>
          <h2 className="auth-title">Mot de passe oublié?</h2>
          <p className="auth-subtitle">
            Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la façon de modifier votre mot de passe.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Votre e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login" className="auth-link">
            Revenir à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
