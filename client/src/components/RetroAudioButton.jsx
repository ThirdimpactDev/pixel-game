import React, { useState, useRef } from 'react';
import RetroButton from './RetroButton';

const RetroAudioButton = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    React.useEffect(() => {
        audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

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

    return (
        <RetroButton onClick={handleClick}>
            {isPlaying ? 'Stop Music' : 'Play Music'}
        </RetroButton>
    );
};

export default RetroAudioButton;