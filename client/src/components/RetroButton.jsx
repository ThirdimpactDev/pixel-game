import React from 'react';
import styles from './RetroButton.module.css';

const RetroButton = ({ onClick, children }) => {
    return (
        <div className={styles.retroContainer}>
            <button className={styles.retroPixel} onClick={onClick}>
                {children}
                <div className={styles.retroPixelAnimation}>
                    {[...Array(32)].map((_, index) => (
                        <div key={index} className={styles.retroPixelParticle} />
                    ))}
                </div>
            </button>
        </div>
    );
};

export default RetroButton;