import '../userControleBtn.scss';
import { useState } from 'react';
import { ResetAllAlertsProps } from "./resetAllAlertsInterface"
import { ConfirmDialog } from '../../confirmDialog/ConfirmDialog';

export const ResetAllAlertsPopUp: React.FC<ResetAllAlertsProps> = ({
    userAuthority,
    handleResetAllAlerts,
}) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        handleResetAllAlerts();
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
    };

    return (
        <div className='userControle'>
            <button
                className='btn resetAllAlertsButton'
                onClick={handleDeleteClick}
                disabled={userAuthority < 7}
            >
            全警報解除
            </button>
            <ConfirmDialog
                isOpen={showConfirmModal}
                title='注意!'
                message={
                `全てのAlertを解除します\nよろしいでしょうか？`
                }
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    )
}