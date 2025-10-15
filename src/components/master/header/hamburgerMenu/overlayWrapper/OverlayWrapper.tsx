import React, { ReactNode, useRef } from 'react';
import { OverlayWrapperProps } from './overlayWrapperInterface';
import './overlayWrapper.scss';

export const OverlayWrapper: React.FC<OverlayWrapperProps> = ({
    isOpen,
    onClose,
    children,
    contentClassName = 'overlayContent'
}) => {
    const contentRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    return (
        <div
            className='overlay'
            onClick={(e) => {
                if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
                    onClose();
                }
            }}
        >
            <div
                className={contentClassName}
                ref={contentRef}
            >
                {children}
            </div>
        </div>
    );
};