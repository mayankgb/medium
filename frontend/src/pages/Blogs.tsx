import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"


export const Blogs=()=>{
    const {loading,blogs} = useBlogs();

    if (loading) {
        return <div className="flex flex-col items-center h-screen justify-center mt-10">
            <div className="w-full">
            <AppBar></AppBar>
            </div>
            <div className="w-2/4">
            <BlogSkeleton/>
            </div >
            <div className="w-2/4">
            <BlogSkeleton/>
            </div>
            <div className="w-2/4" >
            <BlogSkeleton/>
            </div>
            <div className="w-2/4">
            <BlogSkeleton/>
            </div>
            <div className="w-2/4">
            <BlogSkeleton/>
            </div>
        </div>
    }
    return(
        <div className="flex flex-col items-center h-max justify-center">
            <div className="w-full mb-3 " >
            <AppBar></AppBar>
            </div>
            <div className="w-2/4">
            {blogs.map(blog=>
                <div className="cursor-pointer">
                <BlogCard id={blog.id} authorName={blog.author.name} title={blog.title}
                description={blog.content}
                publishedDate={"90"}
                ></BlogCard>
                </div>
            )}
            </div>
           
           
        </div>
    )
}