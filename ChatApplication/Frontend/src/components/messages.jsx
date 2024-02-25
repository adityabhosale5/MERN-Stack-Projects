import React , {useState, useEffect} from "react";
import styled from "styled-components";
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {json, useNavigate} from "react-router-dom";
import loader from "../assets/Loader6.gif"
import { Buffer } from "buffer";

export default function Messages(){
    return <Container>
        Messages
    </Container>
}

const Container = styled.div`
    height: 80%;
`;
