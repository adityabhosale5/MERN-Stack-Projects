import React , {useState, useEffect} from "react";
import styled from "styled-components";
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {json, useNavigate} from "react-router-dom";
import loader from "../assets/Loader6.gif"
import { Buffer } from "buffer";

export default function SetAvatar(){

    const api = `https://api.multiavatar.com/1234567`;
    const navigate = useNavigate();
    const [avatars, setAvatars]=useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [selectedAvatar, setSelectedAvatar]=useState(undefined);
    const toastOption = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme : "light",
    };

    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login');
        }

    }, []);

    const setProfilePicture = async() => {
        if(selectedAvatar === undefined){
            toast.error("Please Select an Avatar", toastOption);
        } else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`http://localhost:5000/api/auth/setavatar/${user._id}`,{
                image: avatars[selectedAvatar]
            });
            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            }else{
                toast.error("Error while setting Avatar. Please try again", toastOption)
            }
        }
    };

    
    useEffect(() => {
        const init = async() => {
            const data=[];
            for(let i=0;i<4;i++){
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        init();
    },[]);

    return (
        <>
        {
            isLoading ? <Container>
                <img src= {loader} alt="loader" className="loader"/>
            </Container> : (
            <Container>
                <div className="title-container">
                    <h1>Please select an avatar for your profile picture</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar,index) => {
                        return (
                            <div key = {index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)}/>
                            </div>                    
                        )
                    })
                }</div>
                <button className ="submit-btn" onClick={() => setProfilePicture()}>Set as Profile Picture</button>
            </Container>
            )
        }
        <ToastContainer/>
        </>
    )
}

const Container = styled.div`
    display : flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #101920;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
            color: white;
        }
    }

    .avatars{
        display:flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.2rem;
            border-radius: 5rem;
            display : flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
            &:hover{
                transform : scale(1.3);
            }
        }
        .selected{
            border: 0.5rem solid #17C2DC;
        }
    }
    .submit-btn{
        width:300px;
        font-size:20px;
        margin-top: 15px;
        padding: 0.7rem;
        border-radius: 1.3rem; 
        // border:0.8px solid #46467c;
        color : white;
        background-color : #2A3D44;
        font-weight:bold;
        cursor: pointer;
        border: none;
        outline: none;
        transition : transform 0.6s;
        &:hover{
            border:0.8px solid #2A3D44;
            background-color : #2A3D44;
            color: white;
            transform : scale(1.1);
        }
    }
`;