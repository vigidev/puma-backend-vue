import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Redirect from '@/components/Redirect'
import Page403 from '@/components/Page403'
import Page404 from '@/components/Page404'
import Layout from '@/components/Layout'
import Dashboard from '@/components/Dashboard'
import About from '@/components/About'
import News from '@/components/News'
import NewsCategory from '@/components/NewsCategory'
import Download from '@/components/Download'
import DownloadCategory from '@/components/DownloadCategory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/callback',
      name: 'Redirect',
      component: Redirect,
      props: (route) => ({ redirect_url: route.query.redirect_url }),
      meta: {
          auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
          auth: false
      }
    },
    {
      path: '/403',
      name: 'Page403',
      component: Page403,
      meta: {
          auth: true
      }
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404,
      meta: {
          auth: true
      }
    },
    {
      path: '',
      component: Layout,
      redirect: 'login',
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
            meta: {
                auth: true
            }
        // meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      },
      {
        path: 'about',
        name: 'About',
        component: About,
            meta: {
                auth: {
                    roles: 'Admin',
                    forbiddenRedirect: '/403'
                }
            }
      },
      {
        path: 'news',
        name: 'News',
        component: News,
            meta: {
                auth: true
            }
      },
      {
        path: 'news/category',
        name: 'NewsCategory',
        component: NewsCategory,
            meta: {
                auth: true
            }
      },
      {
        path: 'download',
        name: 'Download',
        component: Download,
            meta: {
                auth: true
            }
      },
      {
        path: 'download/category',
        name: 'DownloadCategory',
        component: DownloadCategory,
            meta: {
                auth: true
            }
      }]
    }
  ],
  mode: 'history', // https://router.vuejs.org/en/essentials/history-mode.html
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
