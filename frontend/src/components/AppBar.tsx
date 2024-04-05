import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = ()=>{
    return <div className="p-3 border-b flex justify-between items-center px-10">
        <div>
            <Link to={"/blogs"}>
            Medium
            </Link>
            
        </div>
        
        <div className="flex ">
            <div className="pt-1">
                <Link to={"/publish"}>
                <button type="button" className=" mr-8 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>

                </Link>
               
            </div>
            <div>
            <Avatar name="Mayank"/>
            </div>
            
        </div>
    </div>
}