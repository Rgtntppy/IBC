import './prepareForTheNextDaypopUp.scss';
import { useState, useEffect } from 'react';
import { PrepareForTheNextDayPopUpProps } from './prepareForTheNextDaypopUpInterface';

export const PrepareForTheNextDayPopUp: React.FC<PrepareForTheNextDayPopUpProps> = ({
    userAuthority,
    prepareNextDay,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (showConfirmModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => {
        document.body.style.overflow = '';
    };
  }, [showConfirmModal]);

  return (
    <div className='prepareNextDayContents'>
      <button
        className='prepareNextDay'
        onClick={userAuthority >= 5 ? () => setShowConfirmModal(true) : undefined}
        disabled={userAuthority < 5}
      >
        翌日分準備
      </button>
      {showConfirmModal && (
        <div className='nextDayModalOverlay'>
          <div className='nextDayModalContent'>
            <p>
              本日分のデータは失われますが
              <br/>
              よろしいでしょうか？
            </p>
            <div className='nextDayModalButtons'>
              <button
                className='yesAnswer'
                onClick={() => {
                  prepareNextDay();
                  setShowConfirmModal(false);
                }}
              >
                はい
              </button>
              <button
                className='noAnswer'
                onClick={() => setShowConfirmModal(false)}
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};