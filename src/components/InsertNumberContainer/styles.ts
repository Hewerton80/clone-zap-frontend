import styled from 'styled-components';
import { themes } from '../../styles/colors';


export const Container = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    padding: 0 30px;
    & > div {
        max-width: 1000px;
        width: 100%;
        display: flex;
        justify-content: center;
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
        border: 1px solid ${themes.light.gree2};
        border-radius: 18px;
        overflow: hidden;
    }
    header {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 12px 20px;
        background: ${themes.light.gree2};
    }
    h2 {
        font-size: 24px;
        color: ${themes.light.primary};
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
        background: ${themes.light.primary};
        height: 35px;
        border-bottom: 1px solid ${themes.light.gree3};
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
        color: ${themes.light.black};
        outline: none;
        &::placeholder {
            color: ${themes.light.gray2};
        }
    }
    button {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${themes.light.greem};
        color: ${themes.light.primary};
        height: 38px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem; //16px
        text-transform: uppercase;
        margin-bottom: 9px;;
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
        color: ${themes.light.red};
        margin-bottom: 9px;
        margin-top: 4px;
    }
    .invalid{
        opacity: 0.4;
    }
    p {
        color: ${themes.light.gree2};
    }
    b {
        font-weight: bold;
        cursor: pointer;
        text-transform: uppercase;
    }
`;
