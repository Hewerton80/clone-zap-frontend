import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    padding: 0 30px;
    & > div {
        max-width: 1000px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }
    .form-wrapper {
        max-width: 460px;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 50px;
        
    }
    form {
        width: 100%;
        border: 1px solid ${colors.gree2};
        border-radius: 18px;
        overflow: hidden;
    }
    header {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 12px 20px;
        background: ${colors.gree2};
    }
    h2 {
        font-size: 24px;
        color: ${colors.primary};
        text-align: center;
    }
    main {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 14px;
    }
    .input-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 9px;
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
    .err {
        font-size: 0.875rem; //14px
        color: ${colors.red};
        margin-bottom: 9px;
        margin-top: 4px;
    }
    .invalid{
        opacity: 0.4;
    }
`;
