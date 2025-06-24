import { toast } from 'react-toastify';
import './header.scss';
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
    const reloadMessage = async () => {
        toast.success('更新されました', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    };

    const handleReload = async () => {
        await reloadData();
        reloadMessage();
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
                onClick={handleReload}
                className='reloadButton'
                >
                更新
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