import { RuleBookPage } from '../../RuleBookPage';

export const AboutAreaAlertsPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={121}
            >
            <p className='ruleBookText'>
                上部中央にある「太物・細物・ピック」の各ボタンは、
                それぞれのエリアにおける余力の目安を示しています。
                <br/>
                各ボタンは担当エリアのみ編集可能です。
                <br/>
                左クリックで、「
                <span className='backcolor areaAlertGreenback'>
                緑
                </span>
                →
                <span className='backcolor areaAlertYellowback'>
                黄
                </span>
                →
                <span className='backcolor areaAlertRedback'>
                赤
                </span>
                →
                <span className='backcolor areaAlertGreenback'>
                緑
                </span>
                」の順に切り変わり、右クリックで
                <span className='backcolor areaAlertGreenback'>
                緑
                </span>
                に戻すことができます。
                <br/>
                次のページにある「活用目安」を参考にご利用ください。
                
            </p>
            </RuleBookPage>
        </div>
    )
}