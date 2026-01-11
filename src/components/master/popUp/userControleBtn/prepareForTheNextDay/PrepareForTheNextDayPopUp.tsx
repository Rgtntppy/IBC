import './prepareForTheNextDaypopUp.scss'; 
import '../userControleBtn.scss';
import { useMemo, useState } from 'react';
import { PrepareForTheNextDayProps } from './prepareForTheNextDaypopUpInterface';
import { ConfirmDialog } from '../../confirmDialog/ConfirmDialog';

export const PrepareForTheNextDayPopUp: React.FC<PrepareForTheNextDayProps> = ({
    userAuthority,
    handlePrepareNextDay,
    displayDate,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    const w = ['日','月','火','水','木','金','土'][d.getDay()];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 (${w})`;
  }, []);

  const pad2 = (n: number) => String(n).padStart(2, '0');

  const todayKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}年${pad2(d.getMonth() + 1)}月${pad2(d.getDate())}日`.trim();
  }, []);

  const displayDateKey = useMemo(() => {
    return displayDate
      .replace(/\s*\(.*?\)/,'')
      .replace(/分$/, '')
      .trim();
  }, [displayDate]);

  const isSameDate = todayKey === displayDateKey;

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
          <>
          本日は{today}です。
          <br/>
          <span 
            className={`todaysDate ${isSameDate ? 'dateGreen' : 'dateRed'}`}
          >
          {displayDate}
          </span>
          のデータは失われますが、
          本当によろしいでしょうか？
          </>
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};