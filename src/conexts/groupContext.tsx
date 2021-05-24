import { createContext, ReactNode } from "react";
import useGroup, { IGroup } from "../hooks/useGroups";

interface IGroupContext {
    groups: IGroup[];
    isLoadGroup: boolean;
    groupIndexActived: number | undefined;
    getGroups: (page: string) => void;
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

    const {
        isLoadGroup,
        groups,
        groupIndexActived,
        getGroups,
        addGroup,
        handleSetGroups,
        handleSetGroupIndexAtived
    } = useGroup();

    return (
        <GroupContext.Provider
            value={{
                isLoadGroup,
                groups,
                groupIndexActived,
                getGroups,
                addGroup,
                handleSetGroups,
                handleSetGroupIndexAtived
            }}
        >
            {children}
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupContextProvider };