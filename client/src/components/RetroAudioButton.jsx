import React, { useState, useRef } from 'react';
import RetroButton from './RetroButton';

const RetroAudioButton = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5); // Valor inicial del volumen en 50%
    const audioRef = useRef(null);

    React.useEffect(() => {
        audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = volume; // Establecer el volumen inicial

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [volume]);

    const handleClick = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="flex flex-col items-center">
            <RetroButton onClick={handleClick}>
                {isPlaying ? 'Stop Music' : 'Play Music'}
            </RetroButton>
            <div className="mt-4 flex items-center">
                <label htmlFor="volume" className="mr-2 text-white">Volume:</label>
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-32 cursor-pointer"
                />
                <span className="ml-2 text-white">{(volume * 100).toFixed(0)}%</span>
            </div>
        </div>
    );
};

export default RetroAudioButton;