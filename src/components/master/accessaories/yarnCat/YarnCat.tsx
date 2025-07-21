import { useRef } from 'react';
import './yarnCat.scss';
import { YarnCatProps } from './yarnCatInterface';
import meowSound from '../sounds/cat2.mp3';

export const YarnCat: React.FC<YarnCatProps> = ({
    yarnCat
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        audioRef.current?.play();
    };

    return (
        <div>
            <button
                onContextMenu={handleRightClick}
                className='catButton'
            >
                <img
                    className='yarnCat'
                    src={yarnCat}
                    alt='毛糸猫'
                />
            </button>
            <audio
                ref={audioRef}
                src={meowSound}
                preload='auto'
            />
        </div>
    )
}