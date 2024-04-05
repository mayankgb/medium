import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode,sign,verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@mayk03jun/medium-common';

export const blogRoute = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
    Variables:{
        userId:string
    }
}>()


blogRoute.use("/*", async (c,next)=>{
    const authHeader = c.req.header("authorization")||"";
    console.log(authHeader)
    try{
        const user = await verify(authHeader,c.env.JWT_SECRET);
        if(user){
            c.set("userId",user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message:"You are not logged in"
            })
        }
    }catch(e){
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
});

blogRoute.post("/",async (c)=>{
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if (!success) {
        return c.json({
            message:"Invalid input"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:Number(authorId)
        }
    })
    return c.json({
        id:blog.id
    })
})

blogRoute.put("/",async (c)=>{
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);

    if(!success){
        return c.json({
            message:"Invalid Input"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    const blog = await prisma.post.update({
        where:{
            id:body.id,
        },
        data:{
            title:body.title,
            content:body.content
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRoute.get("/bulk",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            authorId:true,
            author:{
                select:{
                    name:true
                }
            }
        }

    })
    return c.json({
        blogs
    })
})

blogRoute.get("/:id",async (c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
      try{
        const blog = await prisma.post.findFirst({
            where:{
                id:Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                authorId:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            blog
        })
      }catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        })
      }
})