import { RuleBookPage } from '../../RuleBookPage';

export const CutAreaText2Page1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={2}
                textId={202}
            >
            <p className='ruleBookText'>
                準備中...
            </p>
            </RuleBookPage>
        </div>
    )
}