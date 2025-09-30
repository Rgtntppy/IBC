import { RuleBookPage } from '../RuleBookPage';

export const arrangementDrumsPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={9}
                textId={901}
            >
            <p className='ruleBookText'>
                手配品のドラムは便が分かり次第ドラムの詳細（行先・型番・数量）を
            <span className='redmarker'>
                必ず担当者へ報告してください。
            </span>
            </p>
            </RuleBookPage>
        </div>
    )
}