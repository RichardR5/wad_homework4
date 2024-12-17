import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import auth from "../auth";
import ContactView from "../views/ContactView.vue";
import AddPost from "../views/AddPost.vue";

const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
    },
    {
        path: "/contact",
        name: "contact",
        component: ContactView,
    },
    {
        path: '/add-post',
        name: 'AddPost',
        component: AddPost,
    },
    {
        path: '/edit-post/:id',
        name: 'EditPost',
        component: () => import('../views/EditPost.vue'),
        beforeEnter: async (to, from, next) => {
          let authResult = await auth.authenticated();
          if (!authResult) {
            next('/login');
          } else {
            next();
          }
        }
      }
      
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;