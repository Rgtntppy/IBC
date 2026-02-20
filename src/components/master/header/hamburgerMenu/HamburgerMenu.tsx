import './hamburgerMenu.scss';
import React, { useState, useCallback, MouseEventHandler, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HamburgerProps } from './hamburgerMenuInterface';
import { ExtNumberPopUp } from '../../popUp/extNumberPopUp/ExtNumberPopUp';
import { RuleBook } from '../../popUp/ruleBook/RuleBook';
import { LogViewer } from '../../logViewer/LogViewer';
import { OverlayWrapper } from './overlayWrapper/OverlayWrapper';
import { MemoBoard } from '../../memoMessages/MemoBoard';
import Draggable from 'react-draggable';

export const HamburgerMenu: React.FC<HamburgerProps> = ({
    userId,
    userName,
    userAuthority,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showMemoArea, setShowMemoArea] = useState(false);
    const [showExtNumber, setShowExtNumber] = useState(false);
    const [showLogViewer, setShowLogViewer] = useState(false);
    const [showRuleBook, setShowRuleBook] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const memoBoardRef = useRef<HTMLDivElement>(null);

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
                <ul className='userControle'>
                    <li>
                        <button
                            className='btn hamMenubtn'
                            onClick={() => {
                                setShowMemoArea(true);
                                setIsOpen(false);
                            }}
                            >
                            メモ欄
                        </button>
                    </li>
                    <li>
                        <button
                            className='btn hamMenubtn'
                            onClick={() => {
                                setShowExtNumber(true);
                                setIsOpen(false);
                            }}
                            >
                            内線番号
                        </button>
                    </li>
                    <li>
                        <button
                            className='btn hamMenubtn'
                            onClick={() => {
                                setShowLogViewer(true);
                                setIsOpen(false);
                            }}
                            >
                            編集ログ
                        </button>
                    </li>
                    <li>
                        <button
                            className='btn hamMenubtn'
                            onClick={() =>{
                                setShowRuleBook(true);
                                setIsOpen(false);
                            }}
                            >
                            運用マニュアル
                        </button>
                    </li>
                    <li>
                        <button
                            className='btn hamMenubtn'
                            onClick={() => navigate('/')}
                            >
                            ログアウト
                        </button>
                    </li>
                </ul>
            </nav>

            {/* メモ欄 */}
            <OverlayWrapper
                isOpen={showMemoArea}
                onClose={() => setShowMemoArea(false)}
            >
                <Draggable
                    handle='.dragHandle'
                    nodeRef={memoBoardRef}
                >
                    <div
                        ref={memoBoardRef}
                        className='memoAreaContent'
                    >
                        <h2 className='memoAreaTitle'>
                            <span className='dragHandle' />
                            メモ欄
                        </h2>
                        
                        <button
                            className='closeButton'
                            onClick={() => {
                                setShowMemoArea(false);
                                setIsOpen(false);
                            }}
                        />
                        <MemoBoard
                            user={{ uid: userId, name: userName}}
                            userAuthority={userAuthority}
                        />
                    </div>
                </Draggable>
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