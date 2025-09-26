import { RuleBookPage } from '../../RuleBookPage';

export const OfficeAreaText1Page1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={4}
                textId={401}
            >
            <p className='ruleBookText'>
                準備中...
            </p>
            </RuleBookPage>
        </div>
    )
}