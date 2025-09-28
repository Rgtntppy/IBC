import { RuleBookPage } from '../../RuleBookPage';

export const AdditionsAndChangesPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={2}
                textId={201}
            >
            <p className='ruleBookText'>
                ドラム数を追加・変更した際に
                <span className='redmarker'>
                    背景色が赤くなった場合、または赤く表示されている箇所へ追加・変更を行った場合
                </span>
                は、追加したドラムの詳細（行先・型番・数量）を
                <span className='redmarker'>
                    必ず担当者へ報告してください。
                </span>
            </p>
            </RuleBookPage>
        </div>
    )
}