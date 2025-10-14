import React from 'react';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const mainStyle = {
    marginBottom: '25px'
  };

  const temperatureStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0'
  };

  const descriptionStyle = {
    fontSize: '1.5rem',
    color: '#666',
    textTransform: 'capitalize'
  };

  const detailsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  };

  const detailItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h2 style={{ margin: 0, color: '#333' }}>
          {weather.city}, {weather.country}
        </h2>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
          alt={weather.description}
          style={{ width: '80px', height: '80px' }}
        />
      </div>
      
      <div style={mainStyle}>
        <div style={temperatureStyle}>{weather.temperature}°C</div>
        <div style={descriptionStyle}>{weather.description}</div>
      </div>

      <div style={detailsStyle}>
        <div style={detailItemStyle}>
          <span style={{ fontWeight: 'bold' }}>Feels like:</span>
          <span>{weather.feelsLike}°C</span>
        </div>
        <div style={detailItemStyle}>
          <span style={{ fontWeight: 'bold' }}>Humidity:</span>
          <span>{weather.humidity}%</span>
        </div>
        <div style={detailItemStyle}>
          <span style={{ fontWeight: 'bold' }}>Wind Speed:</span>
          <span>{weather.windSpeed} m/s</span>
        </div>
        <div style={detailItemStyle}>
          <span style={{ fontWeight: 'bold' }}>Pressure:</span>
          <span>{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;