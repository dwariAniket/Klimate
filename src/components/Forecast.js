import React from 'react';

const Forecast = ({ forecast }) => {
  const forecastStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const cardsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  };

  const cardStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    border: '1px solid #e9ecef'
  };

  const dateStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  };

  const tempStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#007bff'
  };

  const descStyle = {
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: '10px'
  };

  const detailsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#888'
  };

  return (
    <div style={forecastStyle}>
      <h3 style={{ margin: 0, color: '#333' }}>5-Day Forecast</h3>
      <div style={cardsStyle}>
        {forecast.map((day, index) => (
          <div key={index} style={cardStyle}>
            <div style={dateStyle}>{day.date}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
              alt={day.description}
              style={{ width: '50px', height: '50px' }}
            />
            <div style={tempStyle}>{day.temperature}°C</div>
            <div style={descStyle}>{day.description}</div>
            <div style={detailsStyle}>
              <span>💧 {day.humidity}%</span>
              <span>💨 {day.windSpeed} m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;