import React from 'react'
import styled from "styled-components";
import robot from "../assets/robot.gif";

export default function Welcome({currentUser}){
    return <Container>
        <img src={robot} alt="robot" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a Chat to Start Messaging.</h3>
    </Container>

}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        margin-top: -150px;
        height: 25rem;
    }
    h1{
        margin-top: -50px;
    }
    span{
        color: #07D0F3;
    }
    h3{
        margin-top: 7px;
    }
`;