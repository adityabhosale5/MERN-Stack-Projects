import React , {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {json, useNavigate} from "react-router-dom";
import Contacts from "../components/contacts";
import Welcome from "../components/welcome";
import Chatcontainer from "../components/chatcontainer";
import {io} from "socket.io-client"
import image from "../assets/ChatBackground1.jpg"
import AddNewFriends from "../components/addnewfriends";
function Chat(){

    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const init = async() => {
            if(!localStorage.getItem('chat-app-user')){
                navigate('/login');
            }else{
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            }
        }
        init();
    }, []); 

    useEffect(() => {
        if(currentUser){
            socket.current = io("http://localhost:5000");
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])
    useEffect (() => {
        const init2 = async() => {
            if(currentUser){
                if(currentUser.isAvatarImageSet){
                    const data = await axios.get(`http://localhost:5000/api/auth/allusers/${currentUser._id}`);
                    setContacts(data.data);
                    setIsLoaded(true);
                }else{
                    navigate("/setavatar");
                }
            }
        } 
        init2();
    },[currentUser]);


    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }
    return (
        <>
        <Container>
             {/* style={{background: "linear-gradient(to bottom,#072d44 0%,#072d44 11%,#96BBBA 11%,#96BBBA 100%)"}}> */}
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                
                {isLoaded && currentChat === undefined ?
                    <Welcome currentUser={currentUser} /> : <Chatcontainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                }
            </div>
        </Container>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display : flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    .container {
        height: 100vh;
        width: 100vw;
        background-color: #101920;
        display: grid;
        grid-template-columns : 30% 70%;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns : 35% 65%;
        }
        //@media (max-width: 719px) {
        //     grid-template-columns: 100%;
        // }
    }
`;

export default Chat;