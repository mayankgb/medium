import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog:Blog})=>{
    return <div className="grid grid-cols-12 px-10 h-screen mt-5 ">
        <div className="col-span-8  pt-5">
            <div className="text-5xl font-extrabold pl-2">
                {blog.title}
            </div>
            <div className="text-slate-500 p-2">
                Posted on 2nd december
            </div>
            <div className="pl-2">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4 pl-3">
            <div className="text-slate-600">
                Author
            </div>
            <div className="flex items-center">
                <div>
                    <Avatar name={blog.author.name}></Avatar>
                </div>
                <div className="pl-3">
                    <div className="font-bold text-2xl">
                        {(blog.author.name || "Anonymus").charAt(0).toUpperCase()+(blog.author.name || "Anonymus").slice(1)}
                    </div>
                    <div>
                        Master of Everything
                    </div>
                </div>
            </div>
        </div>
    </div>
}