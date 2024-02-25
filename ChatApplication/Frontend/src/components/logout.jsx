import React from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css"
import {useNavigate, Link} from "react-router-dom";
import {BiPowerOff} from "react-icons/bi";

export default function Logout(){
    const navigate = useNavigate();

    const handleClick = async() => {
        const confirmLogout = window.confirm("Do you really want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            navigate("/login");
        }
    }

    return(
        <Button onClick={() => handleClick()}>
            <BiPowerOff />
        </Button>
    )
}

const Button = styled.div`
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: 30px;
    align-items: center;    
    padding: 0.5rem;
    border-radius: 0.8rem;
    background-color: #2A3D44;
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: white;
    }
`;