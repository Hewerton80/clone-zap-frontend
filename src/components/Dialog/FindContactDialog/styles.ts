import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { LineClamp } from '../../LineClamp';

export const Container = styled.div`
    .input-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        width: 100%;
        background: ${colors.primary};
        height: 35px;
        border-bottom: 1px solid ${colors.gree3};
    }
    input {
        height: 100%;
        width: 100%;
        border: none;
        font-size: 1.25rem; //20px
        color: ${colors.black};
        outline: none;
        &::placeholder {
            color: ${colors.gray2};
        }
    }

    .user {
        display: flex;
        align-items: center;
        width: 310px;
        max-width: 100%;
    }
    span {
    
        margin-left: 10px;
        ${LineClamp(1)}
    }
`;

export const ButtonDialog = styled.button`
    display: flex;
    align-items: center;
    width: 90px;
    justify-content: center;
    border: none;
    padding: 6px 10px;
    background: ${colors.greem};
    color: ${colors.primary};
    /* height: 38px; */
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.875rem; //14px
    text-transform: uppercase;
    &:hover {
        opacity: .6;
    }
    &:disabled{
        opacity: .4;
        cursor: unset;
    }

`

