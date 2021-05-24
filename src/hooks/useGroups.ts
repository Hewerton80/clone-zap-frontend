
import { useCallback, useState } from "react";
import { api } from "../services/api";

export interface IGroup {
    id?: string;
    imgUrl?: string;
    name: string;
    lastMsg: string;
    lastMsgTime: string;
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

    const addGroup = useCallback((group: IGroup)=> {
        setGroups(currentGroups => {
            const index = currentGroups.findIndex(gp => gp.id === group.id)
            const tmpCurrentGroups = [...currentGroups];
            if(index !== -1){
                tmpCurrentGroups.splice(index, 1);
            }
            tmpCurrentGroups.unshift(group);
            return tmpCurrentGroups;
        });
    },[]);

    const handleSetGroups = useCallback((groups: IGroup[])=>{
        setGroups(groups);
    },[])

    const handleSetGroupIndexAtived = useCallback((index: number)=>{
        setGroupIndexAtived(index);
    },[])

    const clearGroup = useCallback(()=>{
        setGroupsFound({} as IGroup);
    },[])

    return { groupFound, isLoadGroup, groups, groupIndexActived, getGroups, clearGroup, addGroup, handleSetGroups, handleSetGroupIndexAtived };

}
export default useGroup;