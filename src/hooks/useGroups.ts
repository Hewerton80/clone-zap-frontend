
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
    const [groups, setGroup] = useState<IGroup[]>([]);
    const [groupFound, setGroupFound] = useState({} as IGroup);

    const getGroups = useCallback(async (page: string) => {
        setIsloadGroup(true);
        try {
            const response = await api.get('/group', {
                params: {
                    page
                }
            })
            response?.data && setGroup(currentGroups => [...currentGroups, ...response?.data]);
        }
        catch (err) {
            console.error(err);
        }
        setIsloadGroup(false);
    }, []);

    const addGroup = useCallback((group: IGroup)=> {
        setGroup(currentGroups => {
            const index = currentGroups.findIndex(gp => gp.id === group.id)
            const tmpCurrentGroups = [...currentGroups];
            if(index !== -1){
                tmpCurrentGroups.splice(index, 1);
            }
            tmpCurrentGroups.unshift(group);
            return tmpCurrentGroups;
        });
    },[]);

    const clearGroup = useCallback(()=>{
        setGroupFound({} as IGroup);
    },[])

    return { groupFound, isLoadGroup, groups, getGroups, clearGroup, addGroup, setGroup };

}
export default useGroup;