import './extNumberPopUp.scss';
import { extNumberProps } from '../../../../data/extNumber/extNumberInterface';
import { extensionNumber } from '../../../../data/extNumber/extNumber';

export const ExtNumberPopUp: React.FC<extNumberProps> = ({
    handleclose,
}) => {

    return (
        <div className='extModalContent'>
            <p className='extNumberList'>
                {extensionNumber.map((ext, index) => (
                    <div
                        key={index}
                        className='extNumber'
                    >
                        <span className='place'>
                            {ext.place}
                        </span>
                        :{ext.number}
                    </div>
                ))}
            </p>
            <div className='extModalButtons'>
                <button
                    className='yesAnswer'
                    onClick={handleclose}
                >
                閉じる
                </button>
            </div>
        </div>
    );
};