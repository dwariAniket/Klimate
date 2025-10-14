import React from 'react';

const FavoriteCities = ({ favorites, onSelectCity, onRemoveFavorite }) => {
  if (favorites.length === 0) return null;

  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '15px'
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e7f3ff',
    padding: '8px 15px',
    borderRadius: '20px',
    border: '1px solid #b3d9ff'
  };

  const cityNameStyle = {
    cursor: 'pointer',
    marginRight: '10px',
    color: '#0066cc',
    fontWeight: '500'
  };

  const removeButtonStyle = {
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, color: '#333' }}>Favorite Cities</h3>
      <div style={listStyle}>
        {favorites.map((city, index) => (
          <div key={index} style={itemStyle}>
            <span 
              style={cityNameStyle}
              onClick={() => onSelectCity(city)}
            >
              {city}
            </span>
            <button 
              onClick={() => onRemoveFavorite(city)}
              style={removeButtonStyle}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCities;