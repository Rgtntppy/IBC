import '../userControleBtn.scss';
import { useState } from 'react';
import { PrepareForTheNextDayProps } from './prepareForTheNextDaypopUpInterface';
import { ConfirmDialog } from '../../confirmDialog/ConfirmDialog';

export const PrepareForTheNextDayPopUp: React.FC<PrepareForTheNextDayProps> = ({
    userAuthority,
    handlePrepareNextDay,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    handlePrepareNextDay();
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className='userControle'>
      <button
        className='btn prepareNextDay'
        onClick={handleDeleteClick}
        disabled={userAuthority < 8}
      >
        翌日分準備
      </button>
      <ConfirmDialog
        isOpen={showConfirmModal}
        title='注意!'
        message={
          `本日分のデータは失われますが\nよろしいでしょうか？`
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};