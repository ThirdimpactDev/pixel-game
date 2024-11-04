import React, { useState, useRef } from 'react';

const RetroMusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        videoRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        onClick={togglePlay}
        className="relative bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg 
                 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="relative z-10 text-xl font-pixel">
          {isPlaying ? 'Stop' : 'Play'} Music
        </span>
      </button>

      {/* Reproductor de YouTube */}
      <iframe
        ref={videoRef}
        width="560"
        height="315"
        src="https://www.youtube.com/watch?v=NCtzkaL2t_Y"
        title="YouTube Video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default RetroMusicButton;
