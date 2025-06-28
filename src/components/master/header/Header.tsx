import { toast } from 'react-toastify';
import './header.scss';
import React, { useState } from 'react';
import { HamburgerMenu } from './hamburgerMenu/HamburgerMenu';
import { HeaderTabProps } from './headerInterface';

export const Header: React.FC<HeaderTabProps> = ({
    userName,
    userAuthority,
    reloadData,
    memo,
    setMemo,
    handleBlur,
}) => {
    const [isReloading, setIsReloading] = useState(false);

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
            toast.success('最新データを読み込みました。', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
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
            <div className='userInfo'>
                <p>
                    ようこそ{userName}さん
                </p>
            </div>
            <div className='reloadButtonWrapper'>
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