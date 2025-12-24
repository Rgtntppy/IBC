import '../userControleBtn.scss';
import './warningPopup.scss';
import { useEffect, useRef, useState } from 'react';
import { WarningPopupProps } from './warningPopupInterface';
import { ConfirmDialog } from '../../confirmDialog/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { RuleBook } from '../../ruleBook/RuleBook';
import { OverlayWrapper } from '../../../header/hamburgerMenu/overlayWrapper/OverlayWrapper';

const TARGET_ID = '808122';

export const CVWarningPopup: React.FC<WarningPopupProps> = ({
    userId,
    onClose,
}) => {
    const [showConfirmModal, setShowConfirmModal] = useState(true);
    const [showRuleBook, setShowRuleBook] = useState(false);

    const navigate = useNavigate();

    if (String(userId) !== String(TARGET_ID)) {
        return null;
    }    

    const handleConfirmDelete = () => {
        setShowConfirmModal(false);
        setShowRuleBook(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        navigate('/');
    };

    const handleCloseRuleBook = () => {
        setShowRuleBook(false);
        onClose?.();
    };

    return (
        <div className='userControle'>
            <ConfirmDialog
                isOpen={showConfirmModal}
                title='警告!'
                message={
                <>
                エリアアラートをご活用ください
                <span className='redmarker'>
                    
                </span>
                </>
                }
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                className='warning'
            />
            {showRuleBook && (
            <OverlayWrapper
                isOpen={showRuleBook}
                onClose={() => setShowRuleBook(false)}
            >
                <RuleBook
                    handleclose={handleCloseRuleBook}
                    initialDepartmentId={1}
                    initialTextId={121}
                />
            </OverlayWrapper>
            )}
        </div>
    )
}