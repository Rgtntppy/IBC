import './dayErrorPopup.scss'
import { useEffect } from 'react';
import { DayErrorPopupProps } from './dayErrorPopupInterface';

export const DayErrorPopup: React.FC<DayErrorPopupProps> = ({
    errorMessage,
    setShowError
}) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                setShowError(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowError]);

    return (
        <div className='popupOverlay'>
            <div className='popupBox'>
                <p>
                    {errorMessage}
                </p>
                <button
                    className='closeButton'
                    onClick={() =>
                        setShowError(false)
                    }
                    >
                    閉じる
                </button>
            </div>
        </div>
    );
};