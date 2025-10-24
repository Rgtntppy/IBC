import { RuleBookPage } from '../RuleBookPage';

export const AboutBinAlertsPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={120}
            >
            <p className='ruleBookText'>
                便名・当日分・翌日分の背景が
                <span className='backcolor redback'>
                    赤色
                </span>
                になっているものは、警告を表す「赤信号」です。
                便名には、注意を促す「
                <span className='backcolor yellowback'>
                    黄色
                </span>
                」の表示もあります。
            </p>
            </RuleBookPage>
        </div>
    )
}