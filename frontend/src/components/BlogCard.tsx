import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName:string,
    title:string,
    description:string
    publishedDate:string
    id:number
}

export const BlogCard = ({authorName,publishedDate,title,description,id}:BlogCardProps)=>{
    return(<Link to={`/blog/${id}`}>
        <div className="p-3  m-1 rounded-lg shadow-md">
            <div className="flex items-center p-1">
            <Avatar name={authorName}/> 
            <div className="font-extralight ml-2">{authorName}</div>
           <div className="ml-2">
           . {publishedDate}
           </div>
            </div>
            <div className="text-xl font-semibold">
                {title}
            </div>
            <div className="text-md  font-thin">
                {description.slice(0,100)+"..."}
            </div>
            <div >
                {`${Math.ceil(description.length/100)} minutes read`}
            </div>
        </div>
        </Link>
    )
}

export function Avatar({name}:{name:string}){
    return(
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
    )
}