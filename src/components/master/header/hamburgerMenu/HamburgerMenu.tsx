import './hamburgerMenu.scss';
import React, { useState, useCallback, MouseEventHandler, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerProps } from './hamburgerMenuInterface';
import { ExtNumberPopUp } from '../../popUp/extNumberPopUp/ExtNumberPopUp';
import { MemoArea } from '../../memoArea/MemoArea';

export const HamburgerMenu: React.FC<HamburgerProps> = ({
    userAuthority,
    memo,
    setMemo,
    handleBlur,
}) => {
    const [showMemoArea, setShowMemoArea] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutsid = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsid);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsid);
        };
    }, []);
    
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        setIsOpen(!isOpen);
    },[ isOpen ]);

    const toggleMenu = useCallback (() => {
        setIsOpen(!isOpen);
    },[ isOpen ]);

    return (
        <div
            className='hamburgerMenu'
            ref={menuRef}
        >
            {/* ハンバーガーボタン */}
            <button className={`hamburgerIcon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className='bar'></div>
                {!isOpen && <span className='menuText'>menu</span>}
                <div className='bar'></div>
            </button>
            
            {/* メニュー */}
            <nav className={`menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    <button
                        onClick={() => {
                            setShowMemoArea(true);
                            setIsOpen(false);
                        }}
                    >
                        メモ欄
                    </button>
                    <ExtNumberPopUp
                        userAuthority={userAuthority}
                        toggleMenu={() => setIsOpen(false)}
                    />
                    <button
                        onClick={() => navigate('/')}
                    >
                        ログアウト
                    </button>
                </ul>
            </nav>
            {showMemoArea && (
                <div className='overlay'>
                    <div className='memoAreaContent'>
                        <h2 className='memoAreaTitle'>メモ欄</h2>
                        <button
                            className='closeButton'
                            onClick={() => {
                                setShowMemoArea(false);
                                setIsOpen(false);
                            }}
                        >
                            X
                        </button>
                        <MemoArea
                            memo={memo}
                            setMemo={setMemo}
                            handleBlur={handleBlur}
                            userAuthority={userAuthority}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};