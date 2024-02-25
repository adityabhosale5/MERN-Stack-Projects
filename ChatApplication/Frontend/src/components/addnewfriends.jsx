import React , {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {IoMdSend} from 'react-icons/io';
import { IoSearch } from "react-icons/io5";


export default function AddNewFriends({currentUser, addBut, setAddBut}){

    const [contacts, setContacts] = useState([]);
    const [searchChats, setSearchChats] = useState([]);
    const [input, setInput] = useState(undefined);

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

    useEffect (() => {
        const init2 = async() => {
            const data = await axios.get(`http://localhost:5000/api/auth/allusers/${currentUser._id}`);
            setContacts(data.data);
            // setIsLoaded(true);
        }
        init2();
    },[]);

    return (
        <Container>
            <div className="header">
                <div className="text">
                    <h1 style={{"marginBottom" : "6px"}}>Add Friends</h1>
                    <h3>Send Request to add new friends</h3>
                </div>
                    
                <button className="btn3" onClick={() => {setAddBut(!addBut);}}>
                    <IoCloseSharp />
                </button>
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
                            <div className="contact">
                            {/* className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}> */}
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
                                <div className="contact">
                                     {/* className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, contact)}> */}
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                                    </div>

                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                    <button  className="btn">
                                        <div className="send">Send</div>
                                        <IoMdSend/>
                                    </button>
                        
                                </div>
                            );
                    })
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    // index: 1;
    display: grid;
    grid-template-rows: 13% 10% 77%;
    overflow: hidden;
    background-color: #2A3D44;
    border-radius: 0 3.5em 3.5em 0;
    box-shadow: 2px 0px 10px 2px rgba(0, 0, 0, 0.5);
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #101920;
        .text{
            margin-left: 30px;
            color: white;
        }
        button{
            margin-left: auto;
            margin-right: 20px;
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
            min-height: 4rem;
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
            .btn{
                display : flex;
                justify-content: center;
                align-items: center;
                margin-left: auto;
                margin-right: 10px;
                padding: 0.5rem;
                width: 100px;
                border-radius: 1.8rem;
                background-color: #2A3D44;
                border: none;
                cursor: pointer;
                gap: 0.4rem;
                .send{
                    font-size: 1.2rem;
                    color: white;
                }
                svg{
                    font-size: 1rem;
                    color: white;
                }
            }
            &:hover{
                background-color: #9da1a3;
            }
        }
    }
`