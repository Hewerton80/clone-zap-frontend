
import { useCallback, useState } from "react";
import { api } from "../services/api";
import { IMessage } from "./useMessage";

export interface IGroup {
    id?: string;
    imgUrl?: string;
    name: string;
    lastMsg: string;
    lastMsgTime: Date;
    countMsgsUnread: number;
    is_private: boolean;
    createtAt: string;
}

const useGroup = () => {

    const [isLoadGroup, setIsloadGroup] = useState(false);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [groupIndexActived, setGroupIndexAtived] = useState<number | undefined>(undefined);
    const [groupFound, setGroupsFound] = useState({} as IGroup);

    const getGroups = useCallback(async (page: string) => {
        setIsloadGroup(true);
        try {
            const response = await api.get('/group', {
                params: {
                    page
                }
            })
            response?.data && setGroups(currentGroups => [...currentGroups, ...response?.data]);
        }
        catch (err) {
            console.error(err);
        }
        setIsloadGroup(false);
    }, []);

    const addGroup = useCallback((group: IGroup) => {
        setGroups(currentGroups => {
            const index = currentGroups.findIndex(gp => gp.id === group.id)
            const tmpCurrentGroups = [...currentGroups];
            if (index !== -1) {
                tmpCurrentGroups.splice(index, 1);
            }
            tmpCurrentGroups.unshift(group);
            return tmpCurrentGroups;
        });
    }, []);

    const updateInfoGroupByMessage = useCallback((message: IMessage, incrementCountMsgsUnread?: boolean) => {
        setGroups(currentGroups => {
            const index = currentGroups.findIndex(gp => gp.id === message.group_id)
            const tmpCurrentGroups = [...currentGroups];
            if (index !== -1) {
                tmpCurrentGroups[index].lastMsg = message.text;
                tmpCurrentGroups[index].lastMsgTime = message.created_at;
                if(incrementCountMsgsUnread){
                    tmpCurrentGroups[index].countMsgsUnread++;
                }
            }
            return tmpCurrentGroups;
        });
    }, []);

    const zereCountMsgsUnreadGroup = useCallback((groupId: string) => {
        setGroups(currentGroups => {
            const index = currentGroups.findIndex(gp => gp.id === groupId)
            const tmpCurrentGroups = [...currentGroups];
            if (index !== -1) {
                tmpCurrentGroups[index].countMsgsUnread = 0;
            }
            return tmpCurrentGroups;
        });
    }, []);

    const handleSetGroups = useCallback((groups: IGroup[]) => {
        setGroups(groups);
    }, [])

    const handleSetGroupIndexAtived = useCallback((index: number) => {
        setGroupIndexAtived(index);
    }, [])

    const clearGroup = useCallback(() => {
        setGroupsFound({} as IGroup);
    }, [])

    return {
        groupFound,
        isLoadGroup,
        groups,
        groupIndexActived,
        getGroups,
        clearGroup,
        addGroup,
        zereCountMsgsUnreadGroup,
        updateInfoGroupByMessage,
        handleSetGroups,
        handleSetGroupIndexAtived
    };
}
export default useGroup;