import { RuleBookPage } from '../../RuleBookPage';

export const AboutMemosPage2: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={101}
            >
            <p className='ruleBookText'>
                大物またはドラムなどの入力には定型入力をご活用ください。
                <br/>
                左下の「+枠追加」または「-枠削除」を押下する事で入力枠を最大６枠まで増減できます。
                <span className='redmarker'>

                </span>
            </p>
            </RuleBookPage>
        </div>
    )
}