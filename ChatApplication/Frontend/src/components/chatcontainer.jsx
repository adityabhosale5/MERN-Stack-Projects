import React,{useState, useEffect, useRef} from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css"
import Logout from "./logout";
import Chatinput from "./chatinput";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

export default function Chatcontainer({currentChat, currentUser, socket}){

    const [messages, setMessages] = useState([]);
    const[arrivalMessage,setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const init = async() => {
            if(currentChat) {
                const response = await axios.post("http://localhost:5000/api/messages/getmsg",{
                    from: currentUser._id,
                    to: currentChat._id,
                });
                setMessages(response.data);
            }
        }
        init();
    }, [currentChat]);


    const handleSendMsg = async (msg) => {
        await axios.post("http://localhost:5000/api/messages/addmsg", {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);
    }

    useEffect(()=>{
        if(socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
            });
        }
    },[]);

    useEffect(()=>{
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour : "smooth"});
    },[messages]);

    return(
    <>
    {currentChat && ( <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"/>
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            {/* <Logout /> */}
        </div>
        <div className="chat-messages">
            {
                messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <Chatinput handleSendMsg={handleSendMsg}/>
    </Container> )}
    </>
    )
        // <div style={{color: "white"}}>Container</div>
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-auto-rows : 15% 70% 15%;
    }
    @media screen and (max-width: 720px) {
        grid-auto-rows : 15% 70% 15%;
    }
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: -12px;
        margin-left: -12px;
        padding: 0 2rem;
        // background-color: #5790ab;
        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3.3rem;
                }
            }
            .username{
                h3{
                    font-size: 28px;
                    color: white;
                }
            }
        }
    }
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0.3rem;
            &-thumb{
                background-color: #ffffff39;
                width: 0.3rem;
                border-radius: 1rem;
            }
        }
        .message {
            display: flex;
            align-items: center;
            .content {
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                color: #d1d1d1;
            }
        }
        .sended{
            justify-content: flex-end;
            .content {
                border-radius: 17px 0 10px 17px;
                background-color: #3a4957;
            }
        }
        .received{
            justify-content: flex-start;
            .content {
                border-radius: 0 17px 17px 10px;
                background-color: #3a4957;
            }
        }
    }
`;