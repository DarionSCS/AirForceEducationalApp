import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGamepad } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/_prestaties.css'; // Ensure this path is correct
import { useQuery } from '@apollo/client';
import { GET_XP } from '../../graphQL/queries';
import { useAuth0 } from '@auth0/auth0-react';

// Function to calculate the stroke dash offset based on the value
const calculateStrokeDashoffset = (value, max) => {
  const radius = 54; // radius of the circle in pixels
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;
  return offset;
};

export default function Prestatie({ auth0_user_id }) {
  const { user } = useAuth0();
  
  const { loading, error, data } = useQuery(GET_XP, {
    variables: { auth0_user_id: user?.sub },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const xp = data?.speler?.xp || 0; 

  const snelsteSPF = 0.95; 
  const gemiddeldVerlies = 2; 
  const behaaldeBadges = 12; 

  return (
    <div className="prestatieCustom-container">
      <div className="prestatieCustom-header">
        <h1>PRESTATIES</h1>
        <div className="prestatieCustom-xp-title">xp</div>
        <div className="prestatieCustom-xp-value">{data.speler.xp}</div>
      </div>

      <div className="prestatieCustom-stats-section">
        <div className="prestatieCustom-stat-item">
          <FontAwesomeIcon icon={faClock} className="prestatieCustom-icon" />
          <div className="prestatieCustom-stat-title">SNELSTE SPEL</div>
          <div className="prestatieCustom-stat-value">14 SEC</div>
        </div>
        <div className="prestatieCustom-stat-item">
          <FontAwesomeIcon icon={faGamepad} className="prestatieCustom-icon" />
          <div className="prestatieCustom-stat-title">BESTE SPEL</div>
          <div className="prestatieCustom-stat-value">1 FOUT</div>
        </div>
      </div>
      <div className="prestatieCustom-stats-section">
        <div className="prestatieCustom-stat-item">
          <div className="prestatieCustom-circle">
            <svg className="progress-ring" width="120" height="120">
              <circle
                className="progress-ring__circle"
                stroke="orange"
                strokeWidth="4"
                fill="transparent"
                r="54"
                cx="60"
                cy="60"
                style={{ strokeDashoffset: calculateStrokeDashoffset(snelsteSPF, 1) }}
              />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="prestatieCustom-circle-text">
                {snelsteSPF}
              </text>
            </svg>
            <div className="prestatieCustom-stat-title">SNELSTE S/P/F</div>
          </div>
        </div>
        <div className="prestatieCustom-stat-item">
          <div className="prestatieCustom-circle">
            <svg className="progress-ring" width="120" height="120">
              <circle
                className="progress-ring__circle"
                stroke="orange"
                strokeWidth="4"
                fill="transparent"
                r="54"
                cx="60"
                cy="60"
                style={{ strokeDashoffset: calculateStrokeDashoffset(gemiddeldVerlies, 10) }}
              />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="prestatieCustom-circle-text">
                {gemiddeldVerlies}
              </text>
            </svg>
            <div className="prestatieCustom-stat-title">GEMIDDELD VERLIES</div>
          </div>
        </div>
        <div className="prestatieCustom-stat-item">
          <div className="prestatieCustom-circle">
            <svg className="progress-ring" width="120" height="120">
              <circle
                className="progress-ring__circle"
                stroke="orange"
                strokeWidth="4"
                fill="transparent"
                r="54"
                cx="60"
                cy="60"
                style={{ strokeDashoffset: calculateStrokeDashoffset(behaaldeBadges, 20) }}
              />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="prestatieCustom-circle-text">
                {behaaldeBadges}
              </text>
            </svg>
            <div className="prestatieCustom-stat-title">BEHAALDE BADGES</div>
          </div>
        </div>
      </div>
      <div className="prestatieCustom-graph-section">
        <h2>UREN GESPEELD</h2>
        <div className="prestatieCustom-graph-placeholder">
          <img src="/assets/images/graph.png" alt="cecchi"/>
        </div>
      </div>
    </div>
  );
}
