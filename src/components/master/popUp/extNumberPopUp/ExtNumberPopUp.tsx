import './extNumberPopUp.scss';
import { useState, useEffect } from 'react';
import { extNumberProps } from '../../../../data/extNumber/extNumberInterface';
import { extensionNumber } from '../../../../data/extNumber/extNumber';

export const ExtNumberPopUp: React.FC<extNumberProps> = ({
    userAuthority,
    toggleMenu,
}) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    const handleclose = () => {
        if (userAuthority >= 1) {
            toggleMenu?.();
            setShowModal(false);
        }
    }

    return (
        <div>
            <button
                className='extNumberButton'
                onClick={userAuthority >= 1 ? () => setShowModal(true) : undefined}
                disabled={userAuthority < 1}
            >
                内線番号
            </button>
            {showModal && (
                <div className='extModalOverlay'>
                    <div className='extModalContent'>
                        <p className='extNumberList'>
                            {extensionNumber.map((ext, index) => (
                                <div
                                    key={index}
                                    className='extNumber'
                                >
                                    <span className='place'>
                                        {ext.place}
                                    </span>
                                    :{ext.number}
                                </div>
                            ))}
                        </p>
                        <div className='extModalButtons'>
                            <button
                            className='yesAnswer'
                            onClick={handleclose}
                            >
                            閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};