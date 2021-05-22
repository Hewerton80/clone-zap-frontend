import styled from 'styled-components';
import { rgba } from 'polished';
import { colors } from '../../styles/colors';

export const Nav = styled.nav`
    display:flex;
    flex-direction: column;
    padding: 20px 0;
    max-width: 200px;
    width: 100%;
    background: ${colors.primary};
    ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
     
    }

    span{
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 16px;
        font-size: 0.9375rem; //15px
        color: ${colors.black};
    } 
    li{
        width: 100%; 
        transition: .3s;
        &.divider{
            border-bottom: 1px solid ${colors.black};
        }

        &:hover {
            background: ${rgba(colors.black, 0.2)};
        }
    }   
 
`;
