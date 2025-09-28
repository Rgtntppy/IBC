import { RuleBookPage } from '../RuleBookPage';

export const AboutBinColorsPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={102}
            >
            <p className='ruleBookText'>
                <span className='backcolor thinRedback'>
                    赤色
                </span>
                が特1・2、
                <span className='backcolor thinYellowback'>
                    黄色
                </span>
                が通常便、
                <br/>
                <span className='backcolor thinGreenback'>
                    緑色    
                </span>
                が路線便、
                <span className='backcolor thinBlueback'>
                    青色    
                </span>
                が共配
                <br/>
                上記の配色になっています。
                <br/>
                共配に関しては3号ドラムが合計4個を超える場合には荷量の調整が必要になってきます。
                <span className='redmarker'>
                </span>
            </p>
            </RuleBookPage>
        </div>
    )
}