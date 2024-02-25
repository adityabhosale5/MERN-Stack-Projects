import React from "react";
import styled from "styled-components";
import {BsGoogle, BsFacebook, BsGithub} from "react-icons/bs";

export default function SocialLoginButtons(){
    return <Container>
        <button type="button">
            <BsGoogle />
        </button>
        <button type="button">
            <BsFacebook />
        </button>
        <button type="button">
            <BsGithub />
        </button>
    </Container>
}

const Container =styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    background-color: transparent;
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        width:40px;
        font-size: 17px;
        padding: 0.5rem;
        padding-bottom: 8px;
        border-radius: 0.7rem; 
        border: 0.4px solid #2b789e;
        color : #2b789e;
        background-color : transparent;
        font-weight:bold;
        cursor: pointer;
        transition : transform 0.1s;
        &:hover{
            background-color : #15445c;
            color: white;
            transform : scale(1.1);
        }
    }
`