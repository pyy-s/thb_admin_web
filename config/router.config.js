export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/company/list', authority: ['admin'] },

      {
        path: '/company/list',
        name: '公司名录',
        icon: 'book',
        component: './Company/index',
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: '同行名录',
        component: './List/TableList',
      },
      {
        path: '/message/list',
        name: '同行社交',
        icon: 'message',
        component: './Message/index',
      },
      {
        path: '/order/list',
        name: '订单管理',
        icon: 'snippets',
        component: './Order/index',
      },
      {
        path: '/setting',
        name: '系统设置',
        icon: 'setting',
        component: './Setting/index',
      },
      {
        component: '404',
      },
    ],
  },
];
