import { FiClock } from 'react-icons/fi';
import { BiCheckDouble, BiCheck } from 'react-icons/bi';
import { IoMdSend } from 'react-icons/io';
import { colors } from '../../styles/colors';

export const msgsData = [
    {
        text: 'Olá, tudo bem!',
        created_at: '09:42',
        status: ''
    },
    {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sed nam quisquam officiis eius ipsum nisi dolorem harum, obcaecati repellendus quod minima rem veritatis aperiam, laudantium aliquid expedita eum excepturi.',
        created_at: '14:45',
        status: ''
    },
]

// 'pendend' | 'sended' | 'received' | 'readed'
export const statusIcons = {
    pendend: <FiClock size={11} />,
    sended: <BiCheck size={11} />,
    received: <BiCheckDouble color={colors.gray2}/>,
    readed: <BiCheckDouble color={colors.blue}/>,
}