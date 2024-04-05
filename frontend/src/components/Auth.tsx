import { SignupInput } from "@mayk03jun/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type}:{type:"signup"|"signin"})=>{
  const navigate = useNavigate();
  const [postInputs,setPostInputs] = useState<SignupInput>({
    email:"",
    password:"",
    name:""
  })


    async function sendRequest(){
        try{
            const response =  await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signin"?"signin":"signup"}`,postInputs)
            // console.log(response.data.message);
            const jwt = response.data;
            const token = JSON.stringify(jwt)
            localStorage.setItem("token",token);
            // console.log(localStorage.getItem("token")
            navigate("/blogs")
        }catch(e){

        }
      
   }


    return <div className="h-screen flex justify-center items-center flex-col">
        <div className="font-bold text-3xl">
           {type=="signin"?"Login to an account":"Create an Account"} 
        </div>
        <div className="text-slate-400">
            {type=="signin"?"Don't have an account ?":"Already have an account ?"} <Link className="pl-2 underline" to={type=="signin"?"/Signup":"/Signin"}>{type=="signin"?"Register":"Login"}</Link>
        </div>
        <div className="flex flex-col justify-center w-full items-center ">
        <div className="w-2/4">
           <LabelledInput label="Email" placeholder="Enter email" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                email:e.target.value
            })
           }}/>
        </div>
        <div className="w-2/4">
        <LabelledInput label="Password" type="password" placeholder="Enter password" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                password:e.target.value
            })
        }}/>
        </div>
       {type=="signup"?<div className="w-2/4 ">
            <LabelledInput label="Name" placeholder="Enter name" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }}/>
        </div>:null} 
        <div className="w-2/4 mt-4 ">
        <button onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signin"?"Signin":"Signup"}</button>

        </div>
        </div>
        
    </div>

}

interface LabelInput{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

function LabelledInput({label,placeholder,onChange,type}:LabelInput){
    return <div className="mt-3">
        <label className="block mb-2 font-semibold  text-md text-gray-900 dark:text-black">{label}</label>
        <input onChange={onChange} type={type||"text"} id="First_Name" className="bg-gray-50 border-gray-300 text-gray-900 text-sm
        rounded-lg w-full p-3 border focus" placeholder={placeholder} required></input>
    </div>
}