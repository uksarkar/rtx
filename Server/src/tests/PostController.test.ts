import { Post, PrismaClient, User } from "@prisma/client";
import { Bootstrapper } from "@Singletons/bootstrapper";
import supertest from "supertest";
import Container from "typedi";

const app = Container.get(Bootstrapper).app;
const prisma = new PrismaClient();

let post: Post, user: User;

beforeAll(async () => {
  await prisma.$connect();

  user = await prisma.user.create({
    data: {
      firstname: "Test",
      lastname: "user"
    }
  });

  post = await prisma.post.create({
    data: {
      title: "This is a initial test post",
      description: "this is the description of the test post",
      user_id: user.id
    }
  });
});

afterAll(async () => {
  await Promise.all([
    prisma.user.delete({ where: { id: user.id } }),
    prisma.$disconnect()
  ]);
});

describe("PostController tests", () => {
  it("PostController@index: list posts", async () => {
    await supertest(app)
      .get("/posts")
      .expect(200)
      .expect(res => {
        expect(res.body.page).toEqual(1);
        expect(res.body.limit).toEqual(10);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      });
  });

  it("PostController@show: should get a post", async () => {
    await supertest(app)
      .get(`/posts/${post.id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.id).toEqual(post.id);
        expect(res.body.user.id).toEqual(user.id);
      });
  });

  it("PostController@show: should be not found", async () => {
    await supertest(app).get("/posts/sdf").expect(404);
  });

  it("PostController@store: should create a post", async () => {
    const title = "Post title goes here";
    const description = "Some description goes here";

    await supertest(app)
      .post("/posts")
      .send({
        title,
        description,
        user_id: user.id
      })
      .expect(201)
      .expect(response => {
        expect(response.body.title).toEqual(title);
        expect(response.body.description).toEqual(description);
        expect(response.body.id).toBeGreaterThan(0);
      });
  });

  it("PostController@store: should not create a post with invalid data", async () => {
    await supertest(app)
      .post("/posts")
      .send({
        title: "T",
        description: "D"
      })
      .expect(400);
  });

  it("PostController@update: should update a post", async () => {
    const title = "Post updated title goes here";
    const description = "Some updated description goes here";

    await supertest(app)
      .patch(`/posts/${post.id}`)
      .send({
        title,
        description
      })
      .expect(200)
      .expect(response => {
        expect(response.body.title).toEqual(title);
        expect(response.body.description).toEqual(description);
      });
  });

  it("PostController@update: can update partial data", async () => {
    const title = "AAAAAAAAAAAAA";
    await supertest(app)
      .patch(`/posts/${post.id}`)
      .send({ title })
      .expect(200)
      .expect(response => {
        expect(response.body.title).toEqual(title);
      });
  });

  it("PostController@update: should validate provided data", async () => {
    await supertest(app)
      .patch(`/posts/${post.id}`)
      .send({
        title: "TT"
      })
      .expect(400);
  });

  it("PostController@update: can handle invalid id", async () => {
    const title = "Post updated title goes here";
    const description = "Some updated description goes here";

    await supertest(app)
      .patch("/posts/sdfds")
      .send({
        title,
        description
      })
      .expect(404);
  });

  it("PostController@destroy: can delete a post", async () => {
    await supertest(app)
      .delete(`/posts/${post.id}`)
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body.success)).toBe(true);
      });
  });
});
