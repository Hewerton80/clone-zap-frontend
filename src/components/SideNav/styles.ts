import styled from 'styled-components';
import { rgba } from 'polished';

import { dimensions } from '../../styles/dimensions';
import { LineClamp } from '../LineClamp';
import { ScrollBarCss } from '../ScrollBar';

export const Aside = styled.aside`
    width: ${dimensions.SideNavWidth}px;
    display: flex;
    flex-direction: column;
    background: ${({theme}) => theme.primary};
    border-right: 1px solid ${({theme}) => theme.sixth};
    svg {
        color: ${({theme}) => theme.gray2};
    }
    header{
        display: flex;
        width: 100%;
        height: ${dimensions.HeaderHeight}px;
        padding: 10px 16px;
        background: ${({theme}) => theme.secondary};
    }
    .actions {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: auto;
        button{
            margin-left: 10px;
        }
        svg {
            font-size: 20px;
        }
    }
    .search-bar{
        position: relative;
        width: 100%;
        height: 50px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        background: ${({theme}) => theme.fourth};
        border-bottom: 0.5px solid ${({theme}) => theme.fifth};
        button{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            background: transparent;
            border: 0;
            outline: none;
            cursor: pointer;
        }
    }
    .input-wrapper {
        position: relative;
        width: 100%;
        background: ${({theme}) => theme.bgInput};
        padding: 0 32px 0 65px;
        height: 35px;
        border-radius: 16px;
        svg {
            position: absolute;
            left: 16px;
            font-size: 16px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    input {
        height: 100%;
        width: 100%;
        border: none;
        font-size: 0.9375rem; //15px
        color: ${({theme}) => theme.gray1};
        background: transparent;
        outline: none;
        &::placeholder {
            color: ${({theme}) => theme.gray2};
        }
    }
    ul{
        ${ScrollBarCss};
        display: flex;
        flex-direction: column;
        max-height: calc(100vh -  ${dimensions.HeaderHeight + 50}px);
        width: 100%;
        overflow: auto;
    }
    li{
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 72px;
        padding-left: 13px;
        border-bottom: 0.5px solid ${({theme}) => theme.fifth};
        cursor: pointer;
        &:hover {
            background: ${({theme}) => theme.seventh};
        }
        &.active {
            background: ${({theme}) => theme.fifth};
        }
    }
    .avatar-group {
        min-width: 50px;
        height: 50px;
        margin-right: 15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        img {
            width: 50px;
            height: 50px;
            object-fit: cover;
        }
    }
    .msgs-group {
        height: 100%;
        padding: 11px 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .title-group {
        ${LineClamp(1)};
        font-size: 1.0625rem; //17px
        color: ${({theme}) => theme.black};
    }
    .last-msg-group {
        ${LineClamp(1)};
        font-size: 0.875rem; //14px
        color: ${({theme}) => rgba(theme.black, 0.8)};
    }
    .time-msgs-group {
        display: flex;
        flex-direction: column;
        margin: 0 15px 0 auto;
    }
    .time-msgs{
        font-size: 0.75rem; //12px
        color: ${({theme}) => rgba(theme.black, 0.45)};
        margin-bottom: 3px;
    }
    .count-msgs{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem; //12px
        background: ${({theme}) => theme.greem};
        color: ${({theme}) => theme.primary};
        width: fit-content;
        margin-left: auto;
        padding: 4.8px ;
        height: 20px;
        min-width: 20px;
        border-radius: 10px;
        font-weight: 600;
        /* padding: 4.8px; */
    }
`;
