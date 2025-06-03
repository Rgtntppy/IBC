import './header.scss';
import { HamburgerMenu } from './hamburgerMenu/HamburgerMenu';
import { HeaderTabProps } from './headerInterface';

export const Header: React.FC<HeaderTabProps> = ({
    userName,
    userAuthority,
    reloadData
}) => {
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
                onClick={reloadData}
                className='reloadButton'
                >
                更新
                </button>
            </div>
            <HamburgerMenu
                userAuthority={userAuthority}
            />
        </div>
    );
};