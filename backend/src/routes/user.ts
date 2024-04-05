import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode,sign,verify } from 'hono/jwt';
import { signinInput,signupInput} from '@mayk03jun/medium-common';

export const userRoute  = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
      }
}>()

userRoute.post("/signup",async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body)
    if (!success) {
      return c.json({
        message:"invalid inputs"
      })
    }
  
    try{
      const user = await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name
        }
      })
      const token = await sign({id:user.id},c.env.JWT_SECRET)
  
      return c.json({
        jwt:token})
    
    }catch(e){
      c.status(411)
      return c.text("invalid user or User already exist");
    }
    
  })
  
  userRoute.post("/signin",async (c)=>{
      const body = await c.req.json();
      const {success} = signinInput.safeParse(body)

      if (!success) {
        c.status(411);
        return c.json({
          message:"Invalid inputs"
        })
      }

      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());


      const user = await prisma.user.findUnique({
          where: {
              email: body.email,
        password:body.password
          }
      });
  
      if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
      }
  
      const token= await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt:token, message:"You are logged in" });
  })

