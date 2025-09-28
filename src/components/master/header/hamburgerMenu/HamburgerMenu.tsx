import './hamburgerMenu.scss';
import React, { useState, useCallback, MouseEventHandler, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerProps } from './hamburgerMenuInterface';
import { ExtNumberPopUp } from '../../popUp/extNumberPopUp/ExtNumberPopUp';
import { MemoArea } from '../../memoArea/MemoArea';
import { RuleBook } from '../../popUp/ruleBook/RuleBook';
import { LogViewer } from '../../logViewer/LogViewer';
import { OverlayWrapper } from './overlayWrapper/OverlayWrapper';

export const HamburgerMenu: React.FC<HamburgerProps> = ({
    userAuthority,
    memo,
    setMemo,
    handleBlur,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showMemoArea, setShowMemoArea] = useState(false);
    const [showExtNumber, setShowExtNumber] = useState(false);
    const [showLogViewer, setShowLogViewer] = useState(false);
    const [showRuleBook, setShowRuleBook] = useState(false);

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
                    <div className='userControle'>
                        <button
                            className='btn hamMenubtn'
                            onClick={() => {
                                setShowMemoArea(true);
                                setIsOpen(false);
                            }}
                            >
                            メモ欄
                        </button>
                        <button
                            className='btn hamMenubtn'
                            onClick={() => {
                                setShowExtNumber(true);
                                setIsOpen(false);
                            }}
                            >
                            内線番号
                        </button>
                        <button
                            className='btn hamMenubtn'
                            onClick={() => {
                                setShowLogViewer(true);
                                setIsOpen(false);
                            }}
                            >
                            編集ログ
                        </button>
                        <button
                            className='btn hamMenubtn'
                            onClick={() =>{
                                setShowRuleBook(true);
                                setIsOpen(false);
                            }}
                            >
                            運用マニュアル
                        </button>
                        <button
                            className='btn hamMenubtn'
                            onClick={() => navigate('/')}
                            >
                            ログアウト
                        </button>
                    </div>
                </ul>
            </nav>

            {/* メモ欄 */}
            <OverlayWrapper
                isOpen={showMemoArea}
                onClose={() => setShowMemoArea(false)}
                contentClassName='memoAreaContent overlayContent'
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
            </OverlayWrapper>

            {/* 内線番号 */}
            <OverlayWrapper
                isOpen={showExtNumber}
                onClose={() => setShowExtNumber(false)}
            >
                <ExtNumberPopUp
                    handleclose={() => setShowExtNumber(false)}
                />
            </OverlayWrapper>

            {/* ログ */}
            <OverlayWrapper
                isOpen={showLogViewer}
                onClose={() => setShowLogViewer(false)}
            >
                <LogViewer
                    handleclose={() => setShowLogViewer(false)}
                />
            </OverlayWrapper>

            {/* 運用マニュアル */}
            <OverlayWrapper
                isOpen={showRuleBook}
                onClose={() => setShowRuleBook(false)}
            >
                <RuleBook
                    userAuthority={userAuthority}
                    handleclose={() => setShowRuleBook(false)}
                />
            </OverlayWrapper>
        </div>
    );
};