import { RuleBookPage } from '../RuleBookPage';

export const AboutBinColorsPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={102}
            >
            <p className='ruleBookText'>
                赤色が特1・2
                <br/>
                黄色が通常便
                <br/>
                緑色が路線便
                <br/>
                青色が共配
                <span className='redmarker'>
                </span>
            </p>
            </RuleBookPage>
        </div>
    )
}