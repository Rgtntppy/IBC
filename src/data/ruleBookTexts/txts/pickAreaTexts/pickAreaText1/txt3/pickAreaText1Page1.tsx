import { RuleBookPage } from '../../../RuleBookPage';

export const PickAreaText1Page1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={3}
                textId={301}
            >
            <p className='ruleBookText'>
            いずれかの便で
            <span className='redmarker'>
                1パレット以上の貨物が発生した場合
            </span>
            は、内容(品目・便・数量)を明確にして、
            <span className='redmarker'>
                必ず担当者へ報告してください。
            </span>
            </p>
            </RuleBookPage>
        </div>
    )
}