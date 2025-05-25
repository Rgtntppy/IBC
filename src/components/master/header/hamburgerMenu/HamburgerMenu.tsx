import './hamburgerMenu.scss';
import React, { useState, useCallback, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerProps } from './hamburgerMenuInterface';
import { ExtNumberPopUp } from '../../popUp/extNumberPopUp/ExtNumberPopUp';

export const HamburgerMenu: React.FC<HamburgerProps> = ({
    userAuthority,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        setIsOpen(!isOpen);
    },[ isOpen ]);

    const toggleMenu = useCallback (() => {
        setIsOpen(!isOpen);
    },[ isOpen ]);

    return (
        <div className='hamburgerMenu'>
            {/* ハンバーガーボタン */}
            <button className={`hamburgerIcon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className='bar'></div>
                {!isOpen && <span className='menuText'>menu</span>}
                <div className='bar'></div>
            </button>
            
            {/* メニュー */}
            <nav className={`menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    <button onClick={() => navigate('/')}>
                    TopPageへ
                    </button>
                    <ExtNumberPopUp
                        userAuthority={userAuthority}
                        toggleMenu={() => setIsOpen(false)}
                    />
                </ul>
            </nav>
        </div>
    );
};