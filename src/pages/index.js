// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    networkInterface: '',
    incidentNature: '',
    incidentTime: '',
    additionalInfo: '',
    userEmail: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert('Ton problème de connection sera traité dans les meilleurs délais !');
    } else {
      alert('Failed to submit questionnaire.');
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="form-header">Incident Wifi Questionnaire</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Sur quel interface réseau?</label>
            <select 
              name="networkInterface" 
              value={formData.networkInterface} 
              onChange={handleChange} 
              required
            >
              <option value="">Séléctionnez une interface réseau</option>
              <option value="SFR_2780">SFR_2780</option>
              <option value="S&Pasfr">S&Pasfr</option>
              <option value="RJ45">RJ45</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nature de l'incident:</label>
            <textarea 
              name="incidentNature" 
              value={formData.incidentNature} 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <label>Heure de l'incident:</label>
            <input 
              type="time" 
              name="incidentTime" 
              value={formData.incidentTime} 
              onChange={handleChange} 
              required
            />
          </div>
          <div className="form-group">
            <label>Quelque chose en plus à rapporter?</label>
            <textarea 
              name="additionalInfo" 
              value={formData.additionalInfo} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="userEmail" 
              value={formData.userEmail} 
              onChange={handleChange} 
              required
            />
          </div>
          <button 
            type="submit" 
            className="submit-button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
