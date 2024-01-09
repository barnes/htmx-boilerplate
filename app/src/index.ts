import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const app = new Elysia()
  .use(cors({origin: '127.0.0.1:5500'}))
  .get("/", () => "Hello Elysia")
  .post('/add-spending', async ({ body })=>{
    const title: string = body.title as string;
    const amount: number = parseInt(body.amount);
    try {
      const res = await db.spending.create({
        data: {
          title,
          amount
        }
      })
    } catch (error) {
      console.error(error);
    }
    try {
      const allSpending = await db.spending.findMany();
      return ('test');
    } catch (error) {
      console.error(error);
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
