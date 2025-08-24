import './prepareForTheNextDaypopUp.scss';
import { useState } from 'react';
import { PrepareForTheNextDayPopUpProps } from './prepareForTheNextDaypopUpInterface';
import { ConfirmDialog } from '../../popUp/confirmDialog/ConfirmDialog';

export const PrepareForTheNextDayPopUp: React.FC<PrepareForTheNextDayPopUpProps> = ({
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
    <div className='prepareNextDayContents'>
      <button
        className='prepareNextDay'
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