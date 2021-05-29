import styled from 'styled-components';
import { rgba } from 'polished';
import { colors } from '../../styles/colors';
import { dimensions } from '../../styles/dimensions';
import { ScrollBarCss } from '../ScrollBar';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    svg {
        color: ${colors.gray2};
    }
    header {
        display: flex;
        width:  calc(100vw - ${dimensions.SideNavWidth}px);
        height: ${dimensions.HeaderHeight}px;
        padding: 10px 16px;
        background: ${colors.secondary};
        border-left: 0.5px solid ${colors.sixth};
        border-bottom: 1px solid ${rgba(colors.black, 0.08)};
    }
    .user-info {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .user-name {
        font-size: 1rem; //16px
        color: ${colors.black};
        line-height: 16px;
        margin-bottom: 2px;
    }
    .user-status {
        font-size: 0.8125rem; //13px
        color: ${rgba(colors.black, 0.6)};
    }
    main {
        ${ScrollBarCss};
        display: flex;
        flex-direction: column;
        height: calc(100vh -  ${dimensions.HeaderHeight}px);
        width:  calc(100vw - ${dimensions.SideNavWidth}px);
        background-image: url('/images/bg-zap.jpg');
        background-repeat: repeat;
        width: 100%;
        overflow: auto;
    }
    input {
        height: 100%;
        width: 100%;
        border: none;
        font-size: 0.9375rem; //15px
        color: ${colors.gray1};
        outline: none;
        &::placeholder {
            color: ${colors.gray2};
        }
    }
    .msgs {
        ${ScrollBarCss};
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        background: transparent;
        height: calc(100vh - ${dimensions.HeaderHeight + dimensions.FooterHeight}px);
        width:  calc(100vw - ${dimensions.SideNavWidth}px);
    }
    .msg-row {
        display: flex;
        padding-right: 9%;
        padding-left: 9%;
        margin-bottom: 12px;
        /* align-items: flex-end; */
    }
    .first-msg {
        margin-top: 12px;
    }
    .my-msg-row {
        justify-content: flex-end;
    }
    .msg-wrapper {
        position: relative;
        border-radius: 7.5px;
        max-width: 65%;
        padding: 6px 7px 8px 9px;
        background: ${colors.primary};
        box-shadow: 0 1px .5px ${rgba(colors.black, 0.13)};
    }
    .my-msg-wrapper {
        background: ${colors.yellow};
    }
    .msg {
        font-size: 0.875rem; //14px
        line-height: 1.1875rem; //19px 
        color: ${colors.black2};
        width: 100%;
        background: transparent;
        margin-right: 30px;

    }

    .time-msg {
        position: absolute;
        display: flex;
        align-items: center;
        font-size: 0.6875rem; //11px
        color: ${rgba(colors.black, 0.45)};
        bottom: 4px;
        right: 7px;
        & svg {
            font-size: 20px;
            margin-left: 2px;
        }
    }
    footer {
        background: ${colors.third};
        height: 62px;
    }
    form {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        svg {
            font-size: 24px;
        }
    }
    .input-wrapper {
        position: relative;
        width: 100%;
        height: 40px;
        background: ${colors.primary};
        padding: 9px 12px 11px 12px;
        border-radius: 21px;

    }
    @media screen and (max-width: 900px) {
        .msg-wrapper {
            max-width: 95%;
        }
    }
    @media screen and (min-width: 1025px) and (max-width: 1300px) {
        .msg-wrapper {
            max-width: 75%;
        }
    }
`;
