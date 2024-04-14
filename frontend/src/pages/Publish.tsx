import { useState } from "react"
import { AppBar } from "../components/AppBar"
import { CreateBlogInput } from "@mayk03jun/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Publish = ()=>{
    const [postInputs, setPostInputs] = useState<CreateBlogInput>({
        title:"",
        content:""
    })
    const navigate = useNavigate();
    return(
        <div>
            <div className="sticky top-0">
                <AppBar></AppBar>
            </div>
            <div className=" pt-7 flex flex-col items-center">
            <div className="w-2/4">
            <label htmlFor="helper-text" className="block mb-2 text-lg font-medium text-gray-900 ">Post title</label>
            <input onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    title:e.target.value
                })
            }} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="focus:outline-none bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="Enter title"></input>   
            </div>
            <div className="mt-2 w-2/4">               
                <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900 ">Content</label>
                <textarea onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        content:e.target.value
                    })
                }} id="message" rows={4} className="block p-3 focus:outline-none w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 dark:placeholder-gray-400" placeholder="Write your thoughts here..."></textarea>
            </div>
            <div className="w-2/4 mt-3 ">
            <button onClick={async()=>{
              const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,
                    postInputs,{
                    headers:{
                        Authorization:JSON.parse(localStorage.getItem("token")||"").jwt
                    }
                })
                navigate(`/blog/${res.data.id}`)
            }} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-8 py-3 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Publish</button>
            </div>
            </div>
            
        </div>
    )
}