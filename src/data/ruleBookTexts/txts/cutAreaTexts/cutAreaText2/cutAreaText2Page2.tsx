import { RuleBookPage } from '../../RuleBookPage';

export const CutAreaText2Page2: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={2}
                textId={202}
            >
            <p className='ruleBookText'>
                まだ準備中...
            </p>
            </RuleBookPage>
        </div>
    )
}