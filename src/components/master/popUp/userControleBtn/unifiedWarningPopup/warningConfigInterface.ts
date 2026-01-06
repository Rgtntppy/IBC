import { UsersProps } from "../../../../../data/users/usersInterface";
import { RuleBookPageProps } from "../../../../../data/ruleBookTexts/txts/ruleBookPageInterface";

type userId = UsersProps['id']
type ruleDepartmentId = RuleBookPageProps['departmentId'];
type ruleTextId = RuleBookPageProps['textId'];

export interface WarningConfig {
    userId: userId;
    targetIds: string[];
    message: React.ReactNode;
    ruleDepartmentId: ruleDepartmentId;
    ruleTextId: ruleTextId;
    onClose: () => void;
}