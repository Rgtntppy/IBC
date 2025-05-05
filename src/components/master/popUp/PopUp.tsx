import './popUp.scss';
import {PopUpProps} from './popUpInterfase';

export const PopUp: React.FC<PopUpProps> = ({
    setShowConfirmModal,
    prepareNextDay
}) => (
    <div className='modal-overlay'>
        <div className='modal-content'>
          <p>本日分のデータは失われますが<br/>よろしいでしょうか？</p>
          <div className='modal-buttons'>
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