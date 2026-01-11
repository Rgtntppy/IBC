import { useEffect, useState } from 'react';
import { saveLog } from '../../../firebase/saveLogData/saveLog';
import { getNextAlertColor } from '../../../firebase/surplusPowerData/getNextAlertColor';
import { subscrideToAlertColors } from '../../../firebase/surplusPowerData/surplusPower';
import { updateAreaAlertColor } from '../../../firebase/surplusPowerData/updateAreaAlerftColor';
import './surplusPower.scss';
import { SurplusPowerProps } from './surplusPowerInterface';
import { SurplusCustombtn } from './surplusPowerPart/customButton';

export const SurplusPower: React.FC<SurplusPowerProps> = ({
    userId,
    userName,        
}) => {
    const [alertColors, setAlertColors] = useState({
        BArea: 'green',
        SArea: 'green',
        PArea: 'green',
    });

    useEffect(() => {
        const unsubscride = subscrideToAlertColors(setAlertColors);
        return () => unsubscride();
    }, []);

    const areaMap: Record<string, string> = {
        BArea: '太物',
        SArea: '細物',
        PArea: 'ピック',
    };

    const areaAlertColorMap: Record<string, string> = {
        green: 'グリーン',
        yellow: 'イエロー',
        red: 'レッド',
    }

    //ユーザー権限マップ
    const userPermissions: Record<string, (keyof typeof alertColors)[]> = {
        '808122': ['SArea'],
        '808121': ['PArea'],
        '809617': ['BArea','SArea','PArea'],
    };

    const allowedAreas = userPermissions[userId] || [];
    
    const handleAlertChange = async (area: keyof typeof alertColors, resetToGreen = false) => {
        if (!allowedAreas.includes(area)) return;

        const nextColor = resetToGreen ? 'green' : getNextAlertColor(alertColors[area]);
        setAlertColors((prev) => ({...prev, [area]: nextColor }));
        await updateAreaAlertColor(area, nextColor);

        await saveLog({
            userId,
            userName,
            binName: areaMap[area],
            key: 'areaAlert',
            diff: areaAlertColorMap[nextColor],
            action: '更新',
        });
    };

    return (
        <div className='surplusPowerContainer'>
            {Object.keys(alertColors).map((areaKey) => {
                const key = areaKey as keyof typeof alertColors;
                const areaAlertColor = alertColors[key];
                const isDisabled = !allowedAreas.includes(key);

                return (
                    <SurplusCustombtn
                        key={key}
                        title={areaMap[key]}
                        areaAlertColor={areaAlertColor}
                        onClick={() => handleAlertChange(key)}
                        onRightClick={() => handleAlertChange(key, true)}
                        disabled={isDisabled}
                    />
                );
            })}
        </div>
    )
}