import React, { Component } from 'react';
import Logo from '../../assets/img/logo.svg';
import styles from './Header.module.css';

class Header extends Component {
    render() {
        return (
            <div className={styles.Header}>
                <img src={Logo} alt="Moviefinder logo" />
                <input type="text" placeholder="Rechercher un film"/>
            </div>
        );
    }
}

export default Header;