import ReactDOM from 'react-dom'
import React, { useEffect } from 'react';
import './confirmDialog.scss';
import { ConfirmDialogProps } from './confirmDialogPropsInterface';

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    title = '確認',
    message,
    onConfirm,
    onCancel,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);
    
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='modalOverlay'>
            <div className='modalContent'>
                <h2 className='modalTitle'>
                    {title}
                </h2>
                <p
                    className='modalMessage'
                    style={{whiteSpace: 'pre-line'}}    
                >
                    {message}
                </p>
                <div className='modalActions'>
                    <button
                        className='btnConfirm'
                        onClick={onConfirm}
                    >
                        OK
                    </button>
                    <button
                        className='btnCancel'
                        onClick={onCancel}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};