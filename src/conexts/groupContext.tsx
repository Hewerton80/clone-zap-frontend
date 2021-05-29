import { createContext, MutableRefObject, ReactNode } from "react";
import useGroup, { IGroup } from "../hooks/useGroups";
import { IMessage } from "../hooks/useMessage";

interface IGroupContext {
    groups: IGroup[];
    isLoadGroup: boolean;
    groupIndexActived: number | undefined;
    getGroups: (page: string) => void;
    zereCountMsgsUnreadGroup: (groupId: string) => void;
    updateInfoGroupByMessage: (message: IMessage, incrementCountMsgsUnread?: boolean) => void;
    addGroup: (groups: IGroup) => void;
    handleSetGroups: (groups: IGroup[]) => void;
    handleSetGroupIndexAtived: (index: number) => void;
}

const GroupContext = createContext({
    groups: []
} as IGroupContext);

interface GroupContextProviderProps {
    children: ReactNode
}

function GroupContextProvider({ children }: GroupContextProviderProps) {

    const groupValues = useGroup();

    return (
        <GroupContext.Provider value={groupValues}>
            {children}
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupContextProvider };