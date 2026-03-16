import { RuleBookPage } from '../../RuleBookPage';

export const AboutMemosPage1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={101}
            >
            <p className='ruleBookText'>
                メモは自由に使用してください。
                <br/>
                ただし、
                <span className='redmarker'>
                メモは追加したユーザーしか編集・削除できません。
                </span>
                <br/>
                不要になったものは順次削除してください。
            </p>
            </RuleBookPage>
        </div>
    )
}