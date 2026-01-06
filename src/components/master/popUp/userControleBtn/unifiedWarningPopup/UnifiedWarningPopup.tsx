import '../userControleBtn.scss';
import './unifiedWarningPopup.scss';
import { useState } from 'react';
import { WarningConfig } from './warningConfigInterface';
import { ConfirmDialog } from '../../confirmDialog/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { RuleBook } from '../../ruleBook/RuleBook';
import { OverlayWrapper } from '../../../header/hamburgerMenu/overlayWrapper/OverlayWrapper';

export const UnifiedWarningPopup: React.FC<{config: WarningConfig}> = ({
    config,
}) => {
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(true);
    const [showRuleBook, setShowRuleBook] = useState(false);


    if (!config.targetIds.includes(String(config.userId))) return null;    

    const handleConfirm = () => {
        setShowConfirmModal(false);
        setShowRuleBook(true);
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
        navigate('/');
    };

    const handleRuleClose = () => {
        setShowRuleBook(false);
        config.onClose?.();
    };

    return (
        <div className='userControle'>
            <ConfirmDialog
                isOpen={showConfirmModal}
                title='警告!'
                message={config.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                className='warning'
            />
            {showRuleBook && (
            <OverlayWrapper
                isOpen={showRuleBook}
                onClose={handleRuleClose}
            >
                <RuleBook
                    handleclose={handleRuleClose}
                    initialDepartmentId={config.ruleDepartmentId}
                    initialTextId={config.ruleTextId}
                />
            </OverlayWrapper>
            )}
        </div>
    )
}