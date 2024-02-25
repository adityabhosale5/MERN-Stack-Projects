import React , {useState, useEffect} from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { EmojiStyle } from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

export default function Chatinput({handleSendMsg}){

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emojiObj) => {
        console.log(emojiObj);
        let message = msg;
        message += event.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }
    return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                { showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} 
                    // style={{
                    //     position: "absolute", 
                    //     top: "-500px",
                    //     // backgroundColor : "#080420",
                    //     boxShadow: "0 5px 10px #9a86f3",
                    //     borderColor: "#9a86f3",
                    // }}
                /> }
            </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder="Type your message here" value={msg} onChange={(e) => setMsg(e.target.value)}/>
            <button type="submit">
                <IoMdSend/>
            </button>
        </form>
    </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: transparent;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    @media screen and (max-width: 720px) {
        padding: 0 0.5rem;
        gap: 0.5rem;
    }
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #FFB824;
                cursor: pointer;
            }
            .EmojiPickerReact {
                position: absolute;
                top: -470px;
                background-color: #2A3D44;
                box-shadow: 0 5px 10px #000;
                // border-color: #9a86f3;
                border: none;
                // --epr-emoji-size: 25px;
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb {
                        background-color: #9a86f3;
                    }
                }
                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }
                .epr-search {
                    background-color: transparent;
                    border-color: #000;
                    color: white;
                }
                .epr-group: before {
                    // border-color: #000;
                    // font-size: 20px;
                    color: #9a86f3;
                }
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        // padding: 2px;
        background-color: #ffffff34;
        input{
            width: 90%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.1rem;
            &::selection{
                background-color: #9186f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #2A3D44;
            border: none;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;
                svg{
                    font-size: 1rem; 
                }
            }
            svg{
                font-size: 2rem;
                color: white;
            }
        }
    }
`;