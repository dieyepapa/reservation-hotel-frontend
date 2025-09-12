import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CameraIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

const EditHotel = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    price_per_night: '',
    address: '',
    phone: '',
    currency: 'F XOF',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const fetchHotel = async () => {
    try {
      setFetchLoading(true);
      const hotel = await api.getHotel(id);
      setFormData({
        name: hotel.name || '',
        email: hotel.email || '',
        price_per_night: hotel.price_per_night || '',
        address: hotel.address || '',
        phone: hotel.phone || '',
        currency: hotel.currency || 'F XOF',
        image: null
      });
      setCurrentImageUrl(hotel.image_url);
    } catch (error) {
      setError('Erreur lors du chargement de l\'hôtel');
      console.error('Error fetching hotel:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner un fichier image valide');
        return;
      }
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Créer une prévisualisation de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        price_per_night: parseFloat(formData.price_per_night),
        address: formData.address,
        phone: formData.phone,
        currency: formData.currency
      };

      // Si une nouvelle image est sélectionnée, on devrait utiliser FormData
      // Pour l'instant, on met à jour seulement les autres champs
      await api.updateHotel(id, updateData);
      navigate('/hotels');
    } catch (error) {
      setError(error.message || 'Erreur lors de la mise à jour de l\'hôtel');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="create-hotel-content">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Chargement de l'hôtel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-hotel-content">
      <div className="create-hotel-header">
        <button 
          onClick={() => navigate('/hotels')}
          className="back-button"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="create-hotel-title">MODIFIER L'HÔTEL</h1>
      </div>

      <form onSubmit={handleSubmit} className="create-hotel-form">
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

        <div className="form-row">
          <div className="form-column">
            <div className="form-group">
              <label className="form-label">Nom de l'hôtel</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Prix par nuit</label>
              <input
                type="number"
                name="price_per_night"
                value={formData.price_per_night}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label className="form-label">Adresse</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Numéro de téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Devise</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              >
                <option value="F XOF">F XOF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Image de l'hôtel</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            disabled={loading}
          />
          
          <div 
            onClick={triggerFileInput}
            className={`relative mt-1 flex justify-center px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'border-gray-300'
            }`}
          >
            <div className="space-y-1 text-center">
              {preview ? (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Aperçu" 
                    className="mx-auto h-20 w-auto object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <CameraIcon className="h-5 w-5 text-white" />
                    <span className="text-white text-xs ml-1">Changer</span>
                  </div>
                </div>
              ) : currentImageUrl ? (
                <div className="relative">
                  <img 
                    src={currentImageUrl} 
                    alt="Image actuelle" 
                    className="mx-auto h-20 w-auto object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <CameraIcon className="h-5 w-5 text-white" />
                    <span className="text-white text-xs ml-1">Changer</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CameraIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Télécharger une image
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="save-button"
            disabled={loading}
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHotel;
