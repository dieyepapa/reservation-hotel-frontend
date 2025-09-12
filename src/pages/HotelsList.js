import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await api.getHotels({ search: searchTerm });
  
      // ⚠️ Si c’est une pagination, les hôtels sont dans response.data
      setHotels(response.data || []);
    } catch (error) {
      setError('Erreur lors du chargement des hôtels');
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' XOF par nuit';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet hôtel ?')) {
      try {
        await api.deleteHotel(id);
        setHotels(hotels.filter((hotel) => hotel.id !== id));
      } catch (error) {
        setError('Erreur lors de la suppression de l\'hôtel');
        console.error('Error deleting hotel:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="hotels-content">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Chargement des hôtels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hotels-content">
      <div className="hotels-header">
        <div>
          <h1 className="hotels-title">Liste des hôtels</h1>
          <p className="hotels-count">Hôtels {hotels.length}</p>
        </div>
        <button 
          className="create-hotel-btn"
          onClick={() => navigate('/hotels/create')}
        >
          + Créer un nouveau hôtel
        </button>
        <form onSubmit={handleSearch}>
          <input 
            type="search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Rechercher un hôtel" 
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <MagnifyingGlassIcon width={20} height={20} />
          </button>
        </form>
      </div>

      {error && (
        <div style={{ 
          color: '#e53e3e', 
          backgroundColor: '#fed7d7', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img 
              src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop'} 
              alt={hotel.name}
              className="hotel-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop';
              }}
              loading="lazy"
            />
            <div className="hotel-info">
              <p className="hotel-location">{hotel.address}</p>
              <h3 className="hotel-name">{hotel.name}</h3>
              <p className="hotel-price">{formatPrice(hotel.price_per_night)} {hotel.currency}</p>
            </div>
            <div className="hotel-actions">
              <button 
                className="edit-btn"
                onClick={() => navigate(`/hotels/${hotel.id}/edit`)}
              >
                <PencilIcon width={20} height={20} />
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(hotel.id)}
              >
                <TrashIcon width={20} height={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsList;
