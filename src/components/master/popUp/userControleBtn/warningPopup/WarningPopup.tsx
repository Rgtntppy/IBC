import { useState } from 'react';
import { WarningPopupProps } from './warningPopupInterface';
import { ConfirmDialog } from '../../confirmDialog/ConfirmDialog';
import { useNavigate } from 'react-router-dom';

const TARGET_ID = '808121';

export const WarningPopup: React.FC<WarningPopupProps> = ({
    userId,
    onClose,
}) => {
    const [showConfirmModal, setShowConfirmModal] = useState(true);

    const navigate = useNavigate();

    if (String(userId) !== String(TARGET_ID)) {
        return null;
    }    

    const handleConfirmDelete = () => {
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        navigate('/');
    };

    return (
        <div className='userControle'>
            <ConfirmDialog
                isOpen={showConfirmModal}
                title='警告!'
                message={
                <>
                手配品のドラムについては、便・行先・数量が判明し次第、
                <span className='redmarker'>
                    必ず担当者へ報告してください。
                </span>
                </>
                }
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    )
}