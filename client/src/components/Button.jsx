import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, children }) => {
    return (
        <div className={styles.container}>
            <button className={styles.pixel} onClick={onClick}>
                <p>{children}</p>
            </button>
        </div>
    );
};

export default Button;
