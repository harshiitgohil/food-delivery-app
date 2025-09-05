import React, { useState } from 'react';
import axios from 'axios';
import './TableReservation.css';

const TableReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    persons: 1,
  });

  const [popup, setPopup] = useState({ show: false, data: null, success: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/Reservations', formData);
      setPopup({
        show: true,
        data: formData,
        success: true
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        persons: 1,
      });
    } catch (err) {
      console.error(err);
      setPopup({
        show: true,
        data: null,
        success: false
      });
    }
  };

  return (
    <div className="reservation-page-live-bg">
      <div className="live-background-center-glow"></div>
      <div className="live-background-particles"></div>

      <div className="reservation-header">
        <h1>RESERVE YOUR TABLE</h1>
        <p>VINCENT RESTAURANT</p>
        <p>Bringing the finest flavors right to your table.</p>
      </div>

      <div className="reservation-container-dark-bg">
        <form className="reservation-form-dark-bg" onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
          
          <select name="persons" value={formData.persons} onChange={handleChange} required>
            {[...Array(30).keys()].map(n => (
              <option key={n+1} value={n+1}>{n+1} Person{n+1 > 1 ? 's' : ''}</option>
            ))}
          </select>

          <input type="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />

          <button type="submit" className="submit-button-dark-bg">BOOK TABLE</button>
        </form>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="popup-overlay" onClick={() => setPopup({ show: false, data: null, success: true })}>
          <div className={`popup-box ${popup.success ? 'success' : 'error'}`} onClick={(e) => e.stopPropagation()}>
            {popup.success && popup.data ? (
              <>
                <h2>✅ Reservation Confirmed!</h2>
                <p><strong>Name:</strong> {popup.data.name}</p>
                <p><strong>Email:</strong> {popup.data.email}</p>
                <p><strong>Phone:</strong> {popup.data.phone}</p>
                <p><strong>Date:</strong> {popup.data.date}</p>
                <p><strong>Time:</strong> {popup.data.time}</p>
                <p><strong>Persons:</strong> {popup.data.persons}</p>
              </>
            ) : (
              <h2>❌ Failed to save reservation</h2>
            )}
            <button onClick={() => setPopup({ show: false, data: null, success: true })}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableReservation;
