import { toast } from 'react-toastify';
import './header.scss';
import React, { useState } from 'react';
import { HamburgerMenu } from './hamburgerMenu/HamburgerMenu';
import { HeaderTabProps } from './headerInterface';
import { SurplusPower } from '../surplusPower/SurplusPower';

export const Header: React.FC<HeaderTabProps> = ({
    userId,
    userName,
    userAuthority,
    addCountFlag,
    setAddCountFlag,
    reloadData,
    memo,
    setMemo,
    handleBlur,
}) => {
    const [isReloading, setIsReloading] = useState(false);

    const addCount = async () => {
        if (userAuthority < 5) return;
        await reloadData();
        setAddCountFlag(true);

        setTimeout(() => setAddCountFlag(false), 5 * 1000);
    };

    const handleClick = async () => {
        if (isReloading) {
            toast.info('再読み込み中です。しばらくお待ちください。', {
                position:'top-center',
                autoClose: 1000,
                hideProgressBar: true,
            });
            return;
        }

        setIsReloading(true);

        try {
            await reloadData();
                toast.success('更新されました', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            });
        } catch (e) {
            toast.error('更新に失敗しました。', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: true,
            });
        } finally {
            setTimeout(() => setIsReloading(false), 2000);
        }
    };
    
    return (
        <div className='header'>
            <h1 className='title'>
                ドラム出荷数管理表
            </h1>
            <SurplusPower
                userId={userId}
                userName={userName}
            />
            <div className='ButtonsWrapper'>
                <button
                onClick={addCount}
                className={`addCountButton ${
                    addCountFlag ? 'addCounting' : '' 
                }`}
                disabled={addCountFlag}
                >
                {addCountFlag ? '編集中...' : '追加・変更'}
                </button>

                <button
                onClick={handleClick}
                className='reloadButton'
                disabled={isReloading}
                >
                {isReloading ? '更新中...' : '更新'}
                </button>
            </div>
            <HamburgerMenu
                userAuthority={userAuthority}
                memo={memo}
                setMemo={setMemo}
                handleBlur={handleBlur}
            />
        </div>
    );
};