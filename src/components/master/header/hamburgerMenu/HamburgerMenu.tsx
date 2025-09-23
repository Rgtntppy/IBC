import './hamburgerMenu.scss';
import React, { useState, useCallback, MouseEventHandler, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerProps } from './hamburgerMenuInterface';
import { ExtNumberPopUp } from '../../popUp/extNumberPopUp/ExtNumberPopUp';
import { MemoArea } from '../../memoArea/MemoArea';
import { RuleBook } from '../../popUp/ruleBook/RuleBook';

export const HamburgerMenu: React.FC<HamburgerProps> = ({
    userAuthority,
    memo,
    setMemo,
    handleBlur,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showMemoArea, setShowMemoArea] = useState(false);
    const [showExtNumber, setShowExtNumber] = useState(false);
    const [showRuleBook, setShowRuleBook] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const memoRef = useRef<HTMLDivElement>(null);
    const  extRef = useRef<HTMLDivElement>(null);
    const ruleRef = useRef<HTMLDivElement>(null);

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

    const toggleMenu = useCallback (() => {
        setIsOpen(!isOpen);
    },[ isOpen ]);

    useEffect(() => {
        const hasOverlay = showMemoArea || showExtNumber || showRuleBook;
        if (hasOverlay) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showMemoArea, showExtNumber, showRuleBook]);


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
                {/* <div>
                    <h2>
                        CVT
                    </h2>

                </div> */}
                <ul>
                    <button
                        onClick={() => {
                            setShowMemoArea(true);
                            setIsOpen(false);
                        }}
                    >
                        メモ欄
                    </button>
                    <button
                        onClick={() =>{
                            setShowExtNumber(true);
                            setIsOpen(false);
                        }}
                    >
                        内線番号
                    </button>
                    <button
                        onClick={() =>{
                            setShowRuleBook(true);
                            setIsOpen(false);
                        }}
                    >
                        運用ルール
                    </button>
                    <button
                        onClick={() => navigate('/')}
                    >
                        ログアウト
                    </button>
                </ul>
            </nav>
            {showMemoArea && (
                <div
                    className='overlay'
                    onClick={(e) => {
                        if (memoRef.current && !memoRef.current.contains(e.target as Node)) {
                            setShowMemoArea(false);
                        }
                    }}
                >
                    <div
                        className='memoAreaContent overlayContent'
                        ref={memoRef}
                    >
                        <h2 className='memoAreaTitle'>
                            メモ欄
                        </h2>
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
            {showExtNumber && (
                <div
                    className='overlay'
                    onClick={(e) => {
                        if (extRef.current && !extRef.current.contains(e.target as Node)) {
                            setShowExtNumber(false);
                        }
                    }}
                >
                    <div
                        className='overlayContent'
                        ref={extRef}
                    >
                        <ExtNumberPopUp
                            userAuthority={userAuthority}
                            onOpen={() => setIsOpen(false)}
                            onClose={() => setShowExtNumber(false)}
                        />
                    </div>
                </div>
            )}
            {showRuleBook && (
                <div
                    className='overlay'
                    onClick={(e) => {
                        if (ruleRef.current && !ruleRef.current.contains(e.target as Node)) {
                            setShowRuleBook(false);
                        }
                    }}
                >
                    <div
                        className='overlayContent'
                        ref={ruleRef}
                    >
                        <RuleBook
                            userAuthority={userAuthority}
                            onOpen={() => setIsOpen(false)}
                            onClose={() => setShowRuleBook(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};