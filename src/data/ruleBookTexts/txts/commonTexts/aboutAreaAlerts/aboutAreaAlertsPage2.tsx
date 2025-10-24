import { RuleBookPage } from '../../RuleBookPage';

export const AboutAreaAlertsPage2: React.FC = () => {
    const requestTaskText = '引取対応・計尺・追加の切断などの依頼';
    
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={121}
            >
            <p className='ruleBookText'>
                <span className='subTitle'>
                活用目安
                </span>
                <br/>
                <span className='backcolor areaAlertGreenback'>
                緑 : 余力あり
                </span>
                <br/>
                {requestTaskText}があっても受けられる状態
                <br/>
                <span className='backcolor areaAlertYellowback'>
                黄 : 余力なし
                </span>
                <br/>
                {requestTaskText}があっても受けることが難しい状態
                <br/>
                <span className='backcolor areaAlertRedback'>
                赤 : ヘルプ
                </span>
                <br/>
                手一杯で余力が無く、可能であれば応援が欲しい状態
            </p>
            </RuleBookPage>
        </div>
    )
}