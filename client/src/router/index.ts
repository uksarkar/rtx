import { title } from "@/compositions/header-composition";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "HOME",
        subtitle: "Welcome to the app.",
      },
    },
    {
      path: "/users",
      component: () => import("../views/UsersView.vue"),
      name: "users",
      meta: { title: "View users", subtitle: "Users" },
    },
    {
      path: "/users/create",
      component: () => import("../views/UserCreate.vue"),
      name: "user-create",
      meta: { title: "Create users", subtitle: "Create" },
    },
    {
      path: "/users/:id/view",
      component: () => import("../views/UserView.vue"),
      name: "users-view",
      meta: { title: "Single user view" },
    },
    {
      path: "/users/:id/edit",
      component: () => import("../views/UserEdit.vue"),
      name: "users-edit",
      meta: { title: "Edit user" },
    },
    {
      path: "/posts",
      component: () => import("../views/PostsView.vue"),
      name: "posts",
      meta: { title: "View Posts", subtitle: "Posts" },
    },
    {
      path: "/posts/create",
      component: () => import("../views/PostCreate.vue"),
      name: "post-create",
      meta: { title: "Post users", subtitle: "Create" },
    },
    {
      path: "/posts/:id/view",
      component: () => import("../views/PostView.vue"),
      name: "post-view",
      meta: { title: "Single post view" },
      sensitive: true,
    },
    {
      path: "/posts/:id/edit",
      component: () => import("../views/PostEdit.vue"),
      name: "posts-edit",
      meta: { title: "Edit post" },
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/NotFoundView.vue"),
      name: "not-found",
      meta: { title: "Error 404" },
      sensitive: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${(to.meta.title as string) || "HOME"} - App name`;
  title.value = (to.meta.subtitle as string) || "";

  next();
});

export default router;
