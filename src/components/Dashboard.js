import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [city, setCity] = useState('Kolkata');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'f20964c453d4497ab8d43716251310';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  const westBengalTowns = [
    'Kolkata', 'Howrah', 'Serampore', 'Bally', 'Baranagar', 'Bhatpara',
    'Kanchrapara', 'Naihati', 'Kalyani', 'Chandannagar', 'Uttarpara'
  ];

  const fetchWeather = async (locationName) => {
    if (!API_KEY) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${locationName}&days=5&aqi=no&alerts=no`
      );

      const current = response.data.current;
      const location = response.data.location;
      const forecastData = response.data.forecast;

      const weatherData = {
        temperature: Math.round(current.temp_c),
        feelsLike: Math.round(current.feelslike_c),
        humidity: current.humidity,
        windSpeed: current.wind_kph,
        description: current.condition.text,
        icon: current.condition.icon,
        city: location.name,
        region: location.region,
        country: location.country,
        uv: current.uv,
        pressure: current.pressure_mb,
        visibility: current.vis_km,
      };

      const weeklyForecast = forecastData.forecastday.map(day => ({
        date: day.date,
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        high: Math.round(day.day.maxtemp_c),
        low: Math.round(day.day.mintemp_c),
        condition: day.day.condition.text,
        chanceOfRain: day.day.daily_chance_of_rain,
      }));

      setWeather(weatherData);
      setForecast(weeklyForecast);
      setError('');

    } catch (err) {
      setError(`"${locationName}" not found. Try: Kolkata, Howrah, etc.`);
    }
    setLoading(false);
  };

  const getWeatherIcon = (condition) => {
    const text = condition?.toLowerCase() || '';
    if (text.includes('sun') || text.includes('clear')) return '☀️';
    if (text.includes('cloud')) return '☁️';
    if (text.includes('rain')) return '🌧️';
    if (text.includes('drizzle')) return '🌦️';
    if (text.includes('storm') || text.includes('thunder')) return '⛈️';
    if (text.includes('snow')) return '❄️';
    if (text.includes('mist') || text.includes('fog')) return '🌫️';
    return '🌈';
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  useEffect(() => {
    if (API_KEY) {
      fetchWeather('Kolkata');
    }
  }, []);

  const displayWeather = weather || {
    temperature: 28, feelsLike: 30, humidity: 65, windSpeed: 12,
    description: 'Partly cloudy', city: 'Kolkata', region: 'West Bengal',
    uv: 6, pressure: 1013, visibility: 10
  };

  const displayForecast = forecast || [
    { day: 'Mon', high: 30, low: 22, condition: 'Partly cloudy', chanceOfRain: 20 },
    { day: 'Tue', high: 32, low: 23, condition: 'Sunny', chanceOfRain: 10 },
    { day: 'Wed', high: 29, low: 21, condition: 'Rain', chanceOfRain: 80 },
    { day: 'Thu', high: 31, low: 24, condition: 'Sunny', chanceOfRain: 5 },
    { day: 'Fri', high: 33, low: 25, condition: 'Clear', chanceOfRain: 0 }
  ];

  const hourlyData = Array.from({ length: 8 }, (_, i) => ({
    time: i === 0 ? 'Now' : `${(new Date().getHours() + i) % 24}:00`,
    temp: displayWeather.temperature + Math.floor(Math.random() * 4) - 2,
    rain: Math.floor(Math.random() * 30) + 10
  }));

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: 'hidden', // 🔥 PREVENTS HORIZONTAL SCROLL
      width: '100vw', // 🔥 FIXES WIDTH TO VIEWPORT
      boxSizing: 'border-box'
    }}>

      {/* Main Container with Fixed Width */}
      <div style={{
        width: '100%',
        maxWidth: '100vw', // 🔥 PREVENTS OVERFLOW
        margin: '0 auto',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>

        {/* Header - Fixed Width */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          height: '80px',
          width: '100%', // 🔥 FULL WIDTH BUT CONTAINED
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem', // 🔥 REDUCED PADDING
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          boxSizing: 'border-box'
        }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '12px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', fontSize: '20px',
              fontWeight: 'bold', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}>
              🌤️
            </div>
            <h1 style={{
              fontSize: '28px', fontWeight: '800',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', margin: 0
            }}>
              Klimate
            </h1>
          </div>

          {/* Search Bar - Responsive */}
          <div style={{
            display: 'flex', width: 'min(400px, 50vw)', // 🔥 RESPONSIVE WIDTH
            gap: '12px', alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)', padding: '8px 16px',
            borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ color: '#667eea', fontSize: '16px' }}>🔍</div>
            <input
              style={{
                flex: 1, border: 'none', outline: 'none',
                background: 'transparent', fontSize: '14px',
                color: '#2d3748', fontWeight: '500',
                width: '100%' // 🔥 FIXED INPUT WIDTH
              }}
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none', padding: '6px 12px', borderRadius: '8px',
                color: 'white', fontSize: '12px', fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1, whiteSpace: 'nowrap'
              }}
            >
              {loading ? '⏳' : 'Search'}
            </button>
          </div>
        </div>

        {/* Quick Access - Responsive */}
        <div style={{
          padding: '1rem 2rem', textAlign: 'center', // 🔥 REDUCED PADDING
          width: '100%', boxSizing: 'border-box'
        }}>
          <h3 style={{
            color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px',
            fontWeight: '600', marginBottom: '12px'
          }}>
            🗺️ West Bengal Cities
          </h3>
          <div style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap',
            justifyContent: 'center', maxWidth: '100%'
          }}>
            {westBengalTowns.slice(0, 6).map(town => (
              <button
                key={town}
                onClick={() => { setCity(town); fetchWeather(town); }}
                style={{
                  padding: '6px 12px', background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px',
                  fontSize: '12px', cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}
              >
                {town}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.9)', color: 'white',
            padding: '12px 2rem', margin: '0 2rem 1rem 2rem', // 🔥 REDUCED MARGIN
            borderRadius: '12px', fontSize: '14px', fontWeight: '500',
            textAlign: 'center', maxWidth: 'calc(100% - 4rem)'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Main Content - Responsive Grid */}
        <div style={{
          padding: '0 2rem 2rem 2rem', // 🔥 REDUCED PADDING
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 400px)', // 🔥 RESPONSIVE GRID
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>

            {/* Current Weather Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ minWidth: '200px' }}>
                  <h3 style={{ color: '#718096', fontSize: '12px', fontWeight: '600', margin: 0 }}>
                    CURRENT WEATHER
                  </h3>
                  <h1 style={{ color: '#2d3748', fontSize: '24px', fontWeight: '700', margin: '4px 0' }}>
                    {displayWeather.city}, {displayWeather.region}
                  </h1>
                  <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
                    {displayWeather.description}
                  </p>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  padding: '6px 12px', borderRadius: '12px',
                  color: 'white', fontSize: '11px', fontWeight: '600'
                }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1.5rem 0', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: '#2d3748' }}>
                    {displayWeather.temperature}°
                  </div>
                  <div style={{ fontSize: '40px' }}>
                    {getWeatherIcon(displayWeather.description)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#718096', fontSize: '12px' }}>Feels like</div>
                  <div style={{ color: '#2d3748', fontSize: '20px', fontWeight: '600' }}>
                    {displayWeather.feelsLike}°C
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', // 🔥 RESPONSIVE GRID
                gap: '1rem',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(226, 232, 240, 0.8)'
              }}>
                {[
                  { label: 'Humidity', value: `${displayWeather.humidity}%`, icon: '💧' },
                  { label: 'Wind', value: `${displayWeather.windSpeed} km/h`, icon: '💨' },
                  { label: 'UV Index', value: displayWeather.uv, icon: '☀️' },
                  { label: 'Pressure', value: `${displayWeather.pressure} hPa`, icon: '📊' }
                ].map((stat, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</div>
                    <div style={{ color: '#718096', fontSize: '11px', fontWeight: '600' }}>
                      {stat.label}
                    </div>
                    <div style={{ color: '#2d3748', fontSize: '16px', fontWeight: '700' }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hourly Forecast - Scrollable */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#2d3748', fontSize: '18px', fontWeight: '700', marginBottom: '1rem' }}>
                Today's Forecast
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {hourlyData.map((hour, index) => (
                  <div key={index} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    minWidth: '60px', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.3)',
                    flexShrink: 0 // 🔥 PREVENTS SHRINKING
                  }}>
                    <div style={{ color: '#718096', fontSize: '12px', fontWeight: '600' }}>
                      {hour.time}
                    </div>
                    <div style={{ fontSize: '16px' }}>
                      {getWeatherIcon(displayWeather.description)}
                    </div>
                    <div style={{ color: '#2d3748', fontSize: '14px', fontWeight: '700' }}>
                      {hour.temp}°
                    </div>
                    <div style={{
                      padding: '2px 6px', background: 'rgba(102, 126, 234, 0.1)',
                      borderRadius: '6px', color: '#667eea', fontSize: '10px', fontWeight: '600'
                    }}>
                      {hour.rain}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>

            {/* 5-Day Forecast */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#2d3748', fontSize: '18px', fontWeight: '700', marginBottom: '1rem' }}>
                5-Day Forecast
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {displayForecast.map((day, index) => (
                  <div key={index} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.75rem', background: index === 0 ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                    borderRadius: '12px', border: index === 0 ? '1px solid rgba(102, 126, 234, 0.2)' : 'none',
                  }}>
                    <div style={{ color: '#2d3748', fontSize: '14px', fontWeight: '600', minWidth: '50px' }}>
                      {index === 0 ? 'Today' : day.day} 
                    </div>
                    <div style={{ fontSize: '20px', minWidth: '30px' }}>
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{
                        background: 'rgba(102, 126, 234, 0.1)', padding: '2px 8px',
                        borderRadius: '8px', color: '#667eea', fontSize: '10px', fontWeight: '600'
                      }}>
                        {day.chanceOfRain}%
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#2d3748', fontSize: '14px', fontWeight: '700' }}>{day.high}°</span>
                      <span style={{ color: '#718096', fontSize: '12px' }}>{day.low}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Tips */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#2d3748', fontSize: '18px', fontWeight: '700', marginBottom: '0.5rem' }}>
                🌟 Weather Tips
              </h3>
              <div style={{ color: '#718096', fontSize: '13px', lineHeight: '1.5' }}>
                {displayWeather.temperature > 30 && '☀️ Stay hydrated in this warm weather'}
                {displayWeather.temperature < 15 && '🧣 Dress warmly today'}
                {displayWeather.description?.toLowerCase().includes('rain') && '🌧️ Carry an umbrella'}
                {displayWeather.uv > 6 && '😎 Use sunscreen protection'}
                {!displayWeather.description?.toLowerCase().includes('rain') && displayWeather.temperature >= 15 && displayWeather.temperature <= 30 && '👍 Perfect weather for outdoor activities!'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;