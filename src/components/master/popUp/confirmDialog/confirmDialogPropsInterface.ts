export interface ConfirmDialogProps {
    isOpen: boolean;
    title?: string;
    message: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}