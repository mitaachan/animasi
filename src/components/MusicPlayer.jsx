import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
  // Menggunakan BASE_URL agar path aman di GitHub Pages (/animasi/)
  const baseUrl = import.meta.env.BASE_URL;
  
  const playlist = [
    `${baseUrl}JustTheWayYouAre.mp3`
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Fungsi utama untuk memutar musik
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Menunggu interaksi user untuk aktifkan suara."));
    }
  };

  // Efek untuk memutar lagu secara otomatis setiap kali index lagu berubah
  useEffect(() => {
    if (isPlaying) {
      playAudio();
    }
  }, [currentSongIndex]);

  // Logic Infinity Loop: Saat lagu selesai, pindah ke index berikutnya
  const handleSongEnded = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  // Trik Auto-Unlock: Musik akan menyala pada interaksi pertama di layar
  useEffect(() => {
    const unlock = () => {
      if (!isPlaying) playAudio();
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('click', unlock);
    window.addEventListener('touchstart', unlock);
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, [isPlaying]);

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={playlist[currentSongIndex]} 
        onEnded={handleSongEnded}
        preload="auto"
      />
      
      <button 
        className={`music-toggle-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={toggleMusic}
        style={{ opacity: 1, pointerEvents: 'auto' }}
      >
        <i className="fa-solid fa-compact-disc"></i>
      </button>
    </>
  );
};

export default MusicPlayer;