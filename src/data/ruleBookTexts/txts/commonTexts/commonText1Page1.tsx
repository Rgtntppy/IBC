import { RuleBookPage } from '../RuleBookPage';

export const CommonText1Page1: React.FC = () => {
    return (
        <div>
            <RuleBookPage
                departmentId={1}
                textId={101}
            >
            <p className='ruleBookText'>
                メモは共有機能となっておりますので、
                <span className='redmarker'>
                    他の人が記入した内容を不用意に削除しないよう
                </span>
                お願いいたします。
                なお、管理画面およびMENUから開けるメモは、どちらも同一の内容です。
            </p>
            </RuleBookPage>
        </div>
    )
}