import React, { useState, useEffect } from 'react';
import './AnalysisResults.css';

export default function AnalysisResults({ analysisData, isLoading }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedItem, setExpandedItem] = useState(null);

  if (isLoading) {
    return <div className="loading">Analyzing data...</div>;
  }

  if (!analysisData) {
    return <div className="placeholder">No analysis data available</div>;
  }

  const {
    contradictions,
    shellCompanyRisk,
    riskScore,
    contradiction_risk_score,
    ownership
  } = analysisData;

  const renderContradictions = () => {
    if (!contradictions || contradictions.length === 0) {
      return <div className="empty-state">✓ No financial contradictions detected</div>;
    }

    const grouped = {
      CRITICAL: contradictions.filter(c => c.severity === 'CRITICAL') || [],
      HIGH: contradictions.filter(c => c.severity === 'HIGH') || [],
      MEDIUM: contradictions.filter(c => c.severity === 'MEDIUM') || [],
      LOW: contradictions.filter(c => c.severity === 'LOW') || []
    };

    return (
      <div className="contradictions-list">
        {Object.entries(grouped).map(([severity, items]) => (
          items.length > 0 && (
            <div key={severity} className={`contradiction-group severity-${severity.toLowerCase()}`}>
              <h4 className="group-title">{severity} ({items.length})</h4>
              {items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="contradiction-item"
                  onClick={() => setExpandedItem(expandedItem === `contra_${idx}` ? null : `contra_${idx}`)}
                >
                  <div className="contradiction-header">
                    <span className="severity-badge">{item.severity}</span>
                    <span className="type-badge">{item.type}</span>
                    <span className="deviation">Deviation: {item.deviation?.toFixed(1)}%</span>
                  </div>
                  <div className="contradiction-message">{item.message}</div>
                  
                  {expandedItem === `contra_${idx}` && (
                    <div className="contradiction-details">
                      {item.assetContext && (
                        <div className="context-block">
                          <strong>Asset Context:</strong>
                          <p>{item.assetContext}</p>
                        </div>
                      )}
                      {item.revenueContext && (
                        <div className="context-block">
                          <strong>Revenue Context:</strong>
                          <p>{item.revenueContext}</p>
                        </div>
                      )}
                      {item.suggestions && item.suggestions.length > 0 && (
                        <div className="suggestions">
                          <strong>Suggestions:</strong>
                          <ul>
                            {item.suggestions.map((sugg, i) => (
                              <li key={i}>{sugg}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ))}
      </div>
    );
  };

  const renderShellCompanyRisk = () => {
    if (!shellCompanyRisk) {
      return <div className="empty-state">No ownership data available</div>;
    }

    const { shellCompanyProbability, riskLevel, indicators = {} } = shellCompanyRisk;
    const allIndicators = [
      ...( indicators.CRITICAL || []),
      ...( indicators.HIGH || []),
      ...( indicators.MEDIUM || []),
      ...( indicators.LOW || [])
    ];

    return (
      <div className="shell-risk-analysis">
        <div className="risk-score-box">
          <div className="score-display">
            <div className={`score-circle risk-${riskLevel?.toLowerCase()}`}>
              {shellCompanyProbability?.toFixed(0)}%
            </div>
            <div className="score-label">
              <strong>Shell Company Risk</strong>
              <span className={`risk-badge risk-${riskLevel?.toLowerCase()}`}>{riskLevel}</span>
            </div>
          </div>
        </div>

        <div className="indicators-grid">
          {allIndicators.map((indicator, idx) => (
            <div key={idx} className={`indicator-card severity-${indicator.flag?.toLowerCase().replace(/_/g, '-') || 'medium'}`}>
              <div className="indicator-code">{indicator.code}</div>
              <div className="indicator-message">{indicator.message}</div>
            </div>
          ))}
        </div>

        {shellCompanyRisk.analysis && (
          <div className="analysis-details">
            <h4>Company Details</h4>
            <dl>
              <dt>Business Activity:</dt>
              <dd>{shellCompanyRisk.analysis.businessActivity || 'Not specified'}</dd>
              <dt>Registration Age:</dt>
              <dd>{shellCompanyRisk.analysis.registrationAge || 'Unknown'}</dd>
              <dt>Director Count:</dt>
              <dd>{shellCompanyRisk.analysis.directorCount}</dd>
              <dt>Annual Turnover:</dt>
              <dd>₹{shellCompanyRisk.analysis.turnover ? (shellCompanyRisk.analysis.turnover / 10000000).toFixed(2) + ' Cr' : '0'}</dd>
              <dt>Employees:</dt>
              <dd>{shellCompanyRisk.analysis.employees || '0'}</dd>
            </dl>
          </div>
        )}
      </div>
    );
  };

  const renderOwnershipStructure = () => {
    if (!ownership) {
      return <div className="empty-state">No ownership structure data</div>;
    }

    const { company, ownership: ownershipData, risks } = ownership;

    return (
      <div className="ownership-structure">
        <div className="company-header">
          <h3>{company.name}</h3>
          <div className="company-identifiers">
            {company.pan && <span className="badge">PAN: {company.pan}</span>}
            {company.cin && <span className="badge">CIN: {company.cin}</span>}
          </div>
        </div>

        {ownershipData?.ultimateBeneficialOwners && ownershipData.ultimateBeneficialOwners.length > 0 && (
          <div className="ownership-section">
            <h4>Ultimate Beneficial Owners</h4>
            <div className="owners-list">
              {ownershipData.ultimateBeneficialOwners.map((owner, idx) => (
                <div key={idx} className="owner-card">
                  <div className="owner-name">{owner.id}</div>
                  <div className="stake-info">
                    <span>Direct Stake: {owner.directStake}%</span>
                    <span>Cumulative Stake: {owner.cumulativeStake?.toFixed(2)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ownershipData?.subsidiaries && ownershipData.subsidiaries.length > 0 && (
          <div className="ownership-section">
            <h4>Subsidiaries ({ownershipData.subsidiaries.length})</h4>
            <div className="subsidiaries-list">
              {ownershipData.subsidiaries.map((sub, idx) => (
                <div key={idx} className="subsidiary-item">
                  <span>{sub.subsidiaryId}</span>
                  <span className="stake">{sub.stake}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {risks?.commonDirectors && risks.commonDirectors.length > 0 && (
          <div className="ownership-section warning">
            <h4>⚠ Shared Directors Across Companies</h4>
            <div className="common-directors-list">
              {risks.commonDirectors.map((director, idx) => (
                <div key={idx} className="director-link">
                  <span>{director.companyName}</span>
                  <span className="count">{director.sharedDirectors.length} shared director(s)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="analysis-results-container">
      <div className="results-header">
        <h2>Advanced Financial Analysis</h2>
        <div className="overall-risk-score">
          <div className={`risk-badge overall risk-score-${getRiskLevel(contradiction_risk_score)}`}>
            Contradiction Risk: {contradiction_risk_score}/100
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'contradictions' ? 'active' : ''}`}
          onClick={() => setActiveTab('contradictions')}
        >
          Financial Contradictions {contradictions?.length > 0 && <span className="count">{contradictions.length}</span>}
        </button>
        <button
          className={`tab ${activeTab === 'ownership' ? 'active' : ''}`}
          onClick={() => setActiveTab('ownership')}
        >
          Ownership & Shell Risk
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="risks-summary">
              <div className="risk-card">
                <h4>Financial Contradictions</h4>
                <div className="risk-details">
                  {contradictions && (
                    <>
                      <div className="stat">
                        <span className="label">Critical Issues:</span>
                        <span className="value critical">{contradictions.filter(c => c.severity === 'CRITICAL').length}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Total Found:</span>
                        <span className="value">{contradictions.length}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Risk Score:</span>
                        <span className="value">{contradiction_risk_score}/100</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="risk-card">
                <h4>Company Ownership Analysis</h4>
                <div className="risk-details">
                  {shellCompanyRisk && (
                    <>
                      <div className="stat">
                        <span className="label">Shell Company Probability:</span>
                        <span className="value">{shellCompanyRisk.shellCompanyProbability?.toFixed(0)}%</span>
                      </div>
                      <div className="stat">
                        <span className="label">Risk Level:</span>
                        <span className={`value risk-${shellCompanyRisk.riskLevel?.toLowerCase()}`}>
                          {shellCompanyRisk.riskLevel}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="label">Critical Indicators:</span>
                        <span className="value">{shellCompanyRisk.summary?.critical || 0}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contradictions' && renderContradictions()}
        {activeTab === 'ownership' && renderShellCompanyRisk()}

        {activeTab === 'ownership' && ownership && (
          <div style={{ marginTop: '2rem' }}>
            {renderOwnershipStructure()}
          </div>
        )}
      </div>
    </div>
  );
}


function getRiskLevel(score) {
  if (score >= 70) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}
