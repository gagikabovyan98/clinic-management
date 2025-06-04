import React, { useState, useEffect } from 'react';

function EhrImages({ ehrId }) {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem('token');

  const fetchEhr = async () => {
    const res = await fetch(`http://localhost:3000/ehr/${ehrId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setImages(data.images || []);
  };

  useEffect(() => {
    fetchEhr();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`http://localhost:3000/upload/image/${ehrId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setFile(null);
      fetchEhr();
    } else {
      alert('upload error');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>medecine pictures</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">upload</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        {images.length === 0 ? (
          <p>no pictures</p>
        ) : (
          images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`EHR ${ehrId}`}
              style={{ maxWidth: '200px', margin: '0.5rem' }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default EhrImages;
