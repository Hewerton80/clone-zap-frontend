import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    padding: 0 30px;
    & > div {
        max-width: 380px;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 50px;
    }
    header {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 12px 20px;
        background: ${colors.gree2};
        border-top-right-radius: 18px;
        border-top-left-radius: 18px;
    }
    h2 {
        font-size: 24px;
        color: ${colors.primary};
        text-align: center;
    }
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 14px;
        border: 1px solid ${colors.gree2};
        border-bottom-right-radius: 18px;
        border-bottom-left-radius: 18px;
    }
    .input-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 18px;
        width: 100%;
        background: ${colors.primary};
        height: 35px;
        border-bottom: 1px solid ${colors.gree3};
    }
    .prefix {
        margin-right: 8px;
        font-size: 1.25rem; //20px
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
    button {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${colors.greem};
        color: ${colors.primary};
        height: 38px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem; //16px
        text-transform: uppercase;
        &:hover {
            opacity: .6;
        }
        &:disabled{
            opacity: .4;
            cursor: unset;
        }
    }
    .arrow {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: cneter;
        background: ${colors.greem};
        svg {
            color: ${colors.primary};
        }
    }
    .invalid{
        opacity: 0.4;
    }
`;
