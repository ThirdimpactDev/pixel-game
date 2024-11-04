import React from 'react';
import RetroAudioButton from '../components/RetroAudioButton';
import RetroButton from '../components/RetroButton';
import styles from '../components/Button.module.css';

const Game = () => {
    return (
        <div className={styles.gameContainer}>
            <div className={styles.gameContent}>
                <h1 className={styles.gameTitle}>Game View</h1>
                <RetroButton onClick={() => console.log('Button clicked!')}>
                    Start Game
                </RetroButton>
                <RetroAudioButton />
            </div>
        </div>
    );
};

export default Game;