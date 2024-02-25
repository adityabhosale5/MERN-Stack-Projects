import React , {useState, useEffect} from "react";
import styled from "styled-components";
import logo from "../assets/Logo4.gif"
import Logout from "./logout";
import { IoSearch } from "react-icons/io5";
import NewFriendReq from "./newfriendreq";
import AddNewFriends from "./addnewfriends";
import {BiPowerOff} from "react-icons/bi";
import {useNavigate, Link} from "react-router-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";

export default function Contacts({contacts, currentUser, changeChat}){

    const navigate = useNavigate();
    const [currentUserName, setCurrentUserName]= useState(undefined);
    const [currentUserImage, setCurrentUserImage]= useState(undefined);
    const [currentSelected, setCurrentSelected]= useState(undefined);
    const [searchChats, setSearchChats] = useState([]);
    const [input, setInput] = useState(undefined);
    const [addButton, setAddButton] = useState(false);
    const [newFButton, setNewFButton] = useState(false);

    useEffect(()=> {
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    },[currentUser]);


    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    const handleClick = async() => {
        const confirmLogout = window.confirm("Do you really want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            navigate("/login");
        }
    }

    const handleChange = (value) => {
        // console.log(value);
        if(value.length > 0){
            setInput(1);
            const search = contacts.filter((contact) => 
            (value && contact && contact.username && (contact.username.toLowerCase().includes(value) || contact.username.includes(value))));
            setSearchChats(search);
        }else{
            setInput(0);
        }
        // console.log(searchChats);
    }   

    const handleAdd = ()=> {
        setAddButton(!addButton)
    }
    const handleNew = ()=> {
        setNewFButton(!newFButton)
    }

    return (
        <>
        {
        addButton ? <AddNewFriends currentUser={currentUser} addBut = {addButton} setAddBut = {setAddButton} /> : 
        newFButton ? <NewFriendReq currentUser={currentUser} newFButton = {newFButton} setNewFButton = {setNewFButton} /> :
        currentUserImage && currentUserName && (
            <Container>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
                    </div>

                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                    <div className="btn-container">
                        {/* <button className="btn1" onClick={() => handleNew()}>
                            <MdOutlineNotificationsActive />
                        </button>
                        <button className="btn2" onClick={() => handleAdd()} >
                            <IoPersonAddSharp />
                        </button> */}
                        <button className="btn3" onClick={() => handleClick()}>
                            <BiPowerOff />
                        </button>
                        {/* <Logout /> */}
                    </div>
                </div>
                <div className="search-bar">
                    <div className="search-icon">
                        <IoSearch />
                    </div>
                    <input type="search" placeholder="Serach or start chat" onChange={(e) => handleChange(e.target.value)}></input>
                </div>
                <div className="contacts">
                    {   
                        input==1 ?
                        searchChats.map((contact, index) => {
                            return (
                                <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                                    </div>

                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        }) :
                        contacts.map((contact, index) => {
                            return (
                                <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                                    </div>

                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                    }) }
                </div>

            </Container>
        )}
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 13% 10% 75%;
    overflow: hidden;
    background-color: #2A3D44;
    border-radius: 0 3.5em 3.5em 0;
    box-shadow: 2px 0px 10px 2px rgba(0, 0, 0, 0.5);
    .current-user{
        padding-left: 20px;
        // padding-top: 1px;
        // padding-bottom: 10px;
        display : flex;
        align-items : center;
        justify-content: center;
        background-color: #101920;
        gap : 1rem;
        .avatar{
            img{
                height: 3.8rem;
                max-inline-size: 100%;
            }
        }
        .username{
            h2{
                color: white;
                font-size: 25px;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.3rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
        .btn-container{
            display: flex;
            justify-content: center;
            align-items: center;    
            gap: 1rem;
            margin-left: auto;
            .btn1{
                padding: 0.5rem;
                border-radius: 0.8rem;
                background-color: #2A3D44;
                border: none;
                cursor: pointer;
                svg{
                    font-size: 1.3rem;
                    color: white;
                }
            }
            .btn2{    
                padding: 0.5rem;
                border-radius: 0.8rem;
                background-color: #2A3D44;
                border: none;
                cursor: pointer;
                svg{
                    font-size: 1.3rem;
                    color: white;
                }
            }
            .btn3{    
                margin-right: 20px;
                padding: 0.5rem;
                border-radius: 0.8rem;
                background-color: #2A3D44;
                border: none;
                cursor: pointer;
                svg{
                    font-size: 1.4rem;
                    color: white;
                }
            }
        }
    }
    .search-bar{
        display: flex;
        justify-content: center;
        align-items : center;
        margin: auto;
        height: 40px;
        gap: 0.5rem;
        border: 1px solid #D3D3D3;
        border-radius: 18px;
        padding: 10px;
        width: 400px; 
        .search-icon {
            margin-right: 5px;
            color: #999;
            svg{
                font-size: 1.3rem;
                color: white;
            }
        }
        input{
            width: 100%;
            font-size:18px;
            border: none;
            outline: none;
            background-color: transparent;
            color: white;
            cursor: text;
        }
    }
    .contacts {
        margin-top: -7px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.3rem;
        
        &::-webkit-scrollbar{
            width: 0.3rem;
            &-thumb{
                background-color: #ffffff39;
                width: 0.2rem;
                border-radius: 1rem;
            }
        }
        .contact{
            background-color: #ffffff39;
            height: 4.8rem;
            width : 400px;
            cursor: pointer;
            border-radius: 1.5rem;
            padding: 0.5rem;
            gap: 1.5rem;
            align-items: center;
            display: flex;
            margin-top: 10px;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    height: 3.5rem;
                    margin-left: 10px;
                    margin-top: 5px;
                }
            }
            .username{
                h3{
                    color: white;
                    font-size:22px;
                }
            }
            &:hover{
                background-color: #9da1a3;
            }
        }
        .selected{
            background-color: #8f9ea6;
        }   
    }
`