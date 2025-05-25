import './popUp.scss';
import { PopUpProps } from './popUpInterface';

export const PopUp: React.FC<PopUpProps> = ({
    setShowConfirmModal,
    prepareNextDay
}) => (
    <div className='nextDayModalOverlay'>
        <div className='nextDayModalContent'>
          <p>本日分のデータは失われますが<br/>よろしいでしょうか？</p>
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
);