import { ReactNode } from 'react';

export interface OverlayWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    contentClassName?: string;
}