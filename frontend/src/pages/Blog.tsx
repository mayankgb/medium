import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { AppBar } from "../components/AppBar";
import { Spinner } from "../components/Spinner";

export const Blog = ()=>{
    const {id}  = useParams();
    const{ loading,blog }= useBlog({
        id:id||""
    });
    if(loading){
        return <div className="flex justify-center items-center h-screen">
           <Spinner/>
        </div>
    }
    return <div>
            <div>
                <AppBar></AppBar>
            </div>
            <div>
            <FullBlog blog={blog}></FullBlog>
            </div>
    </div>
}