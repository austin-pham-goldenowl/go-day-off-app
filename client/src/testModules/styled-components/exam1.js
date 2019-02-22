import styled, { css } from 'styled-components';

export const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
    
    ${props => props.primary && css`
        background: palevioletred;
        color: white;
    `};
`;

// Create a title component that'll render on <h1>  tag with some styles
export const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

// Create a Wrapper component that'll render  a <section> tag with some styles
export const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`;