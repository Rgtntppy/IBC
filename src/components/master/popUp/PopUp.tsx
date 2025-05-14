import './popUp.scss';
import {PopUpProps} from './popUpInterface';

export const PopUp: React.FC<PopUpProps> = ({
    setShowConfirmModal,
    prepareNextDay
}) => (
    <div className='modalOverlay'>
        <div className='modalContent'>
          <p>本日分のデータは失われますが<br/>よろしいでしょうか？</p>
          <div className='modalButtons'>
            <button onClick={() => {
              prepareNextDay();
              setShowConfirmModal(false);
            }}>
              はい
            </button>
            <button onClick={() => setShowConfirmModal(false)}>
              いいえ
            </button>
          </div>
        </div>
      </div>
);