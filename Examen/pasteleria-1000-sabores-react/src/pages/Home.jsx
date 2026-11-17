import React from 'react';

function Home() {
  return (
    <div>
      <h1 className="mb-3" style={{ fontFamily: 'Pacifico, cursive', color: '#8B4513' }}>
        Celebrando 50 años de dulzura
      </h1>
      <p>
        Pastelería 1000 Sabores es un referente en la repostería chilena. Famosos por nuestro
        récord Guinness en 1995, hoy renovamos nuestra experiencia online.
      </p>
      <div className="ratio ratio-16x9 my-4">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Video Pastelería 1000 Sabores"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Home;
