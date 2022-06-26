export default [{
    path: '/newattr/ref',
    name: 'keypress',
    modules: 'newattr',
    title: 'keypress',
    icon: '',
    component: () => import(/* webpackChunkName: "newattr" */ '@/views/newattr/keypress.vue')
  }]

