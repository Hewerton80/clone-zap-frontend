import { SetStateAction } from "react";
import { createContext, ReactNode } from "react";
import useGroup, { IGroup } from "../hooks/useGroups";

interface IGroupContext {
    groups: IGroup[];
    isLoadGroup: boolean;
    getGroups: (page: string) => void;
    addGroup: (groups: IGroup) => void;
    setGroup: (value: SetStateAction<IGroup[]>) => void;
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
        getGroups,
        addGroup,
        setGroup
    } = useGroup();

    return (
        <GroupContext.Provider
            value={{
                isLoadGroup,
                groups,
                getGroups,
                addGroup,
                setGroup
            }}
        >
            {children}
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupContextProvider };