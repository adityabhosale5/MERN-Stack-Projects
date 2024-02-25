import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Logo1 from "../assets/Logo3.gif"
import image from "../assets/Background4.jpg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import SocialLoginButtons from "../components/socialloginbuttons";

function Login(){

    const [values, setValues] = useState({
        username:"",
        password:"",
    });
    const navigate = useNavigate()

    const toastOption = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme : "light",
    };
    
    useEffect(() => {
        if(localStorage.getItem('chat-app-user')){
            navigate('/');
        }
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const {username, password} = values;
            const {data} = await axios.post("http://localhost:5000/api/auth/login",{username,password});
            if (data.status === false) {
                toast.error(data.msg, toastOption);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
            }
        }  
    };

    const handleValidation = () => {
        const {password, username} = values;
        if(username.length === 0 || password.length === 0 ){
            toast.error("Please fill all fields", toastOption);
            return false;
        }
        return true;
    }
    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value});
    };

    return (
        <div style={{backgroundImage: `url(${image})`,
        // backgroundSize: "contain",
        // marginTop: "-20px",
        backgroundSize: "100% 120%",
        // backgroundRepeat: "no-repeat",
        }}>
        <FormContainer >
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo1} alt="Logo" />
                    <h1>ChitChat</h1>
                </div>

                <input type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={(e) => handleChange(e)}/>

                <input type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={(e) => handleChange(e)}/>
 
                <button type="submit" className="btn">LOGIN</button>
                {/* <SocialLoginButtons/> */}
                <span>
                    <Link to="/register" >Don't have an account?</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer />
        </div>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items : center;
    // background-color : #EAF3FE;
    .brand {
        margin-bottom:-30px;
        display : flex;
        margin-left:-70px;
        align-items : center;
        gap : 1rem;
        justify-content: center;
        img{
            width: 150px; 
            height: 150px; 
            object-fit: cover;
            object-position: 15% 15%; 
            
        }
        h1{
            color : #15445c;
            font-size: 35px;
            text-transform: uppercase;
        }
    }
    span{
        text-transform: uppercase;
    }
    input{
        width:350px;
        padding: 0.9rem;
        font-size:18px;
        border-radius:0.5rem;
        border:0.1px solid #D3D3D3;
    }
    .btn{
        width:250px;
        font-size:17px;
        margin-top: 15px;
        padding: 0.7rem;
        border-radius: 1.3rem; 
        border:0.8px solid #137E86;
        color : white;
        background-color : #137E86;
        font-weight: bold;
        cursor: pointer;
        transition : transform 0.6s;
        &:hover{
            background-color : #15445c;
            color: white;
            transform : scale(1.1);
        }
    }
    form{
        width: 520px;
        display:flex;
        align-items : center;
        flex-direction: column;
        justify-content: center;
        
        gap : 1.5rem;
        background-color : #fff;
        border-radius: 2rem;
        padding: 2rem;
    }
`;
export default Login;