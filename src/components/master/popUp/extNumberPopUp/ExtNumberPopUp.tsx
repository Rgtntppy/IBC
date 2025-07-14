import './extNumberPopUp.scss';
import { useState, useEffect } from 'react';
import { extNumberProps } from '../../../../data/extNumber/extNumberInterface';
import { extensionNumber } from '../../../../data/extNumber/extNumber';

export const ExtNumberPopUp: React.FC<extNumberProps> = ({
    userAuthority,
    onOpen,
    onClose,
}) => {
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
            onOpen?.();
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    const handleclose = () => {
        if (userAuthority >= 1) {
            setShowModal(false);
            onClose?.();
        }
    }

    return (
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
    );
};