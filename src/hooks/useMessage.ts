
import { useCallback, useState } from "react";

export type StatusMsgType = 'pendend' | 'sended' | 'received' | 'readed';

export interface IMessage {
    id?: string;
    user_id: string;
    group_id: string;
    text: string,
    created_at: Date,
    status: StatusMsgType,
}

const useMessage = () => {

    const [messages, setMessages] = useState<IMessage[]>([]);

    const addMessage = useCallback((message: IMessage) => {
        setMessages(currentMessages => {
            const tmpCurrentMessages = [...currentMessages];
            tmpCurrentMessages.push(message);
            return tmpCurrentMessages;
        });
    }, []);

    const updateStatusMenssagesByIds = useCallback((ids: string[], status: StatusMsgType) => {
        setMessages(currentMessages => {
            // const index = currentMessages.findIndex(msg => msg.id === id);
            const tmpCurrentMessages = [...currentMessages];
            tmpCurrentMessages.forEach(msg => {
                if (ids.includes(msg.id)) {
                    msg.status = status;
                }
            })
            return tmpCurrentMessages;
        });
    }, []);

    const handleSetMessages = useCallback((messages: IMessage[]) => {
        setMessages(messages);
    }, [])

    const clearMessages = useCallback(() => {
        setMessages([] as IMessage[]);
    }, [])

    return { messages, clearMessages, addMessage, handleSetMessages, updateStatusMenssagesByIds };

}
export default useMessage;