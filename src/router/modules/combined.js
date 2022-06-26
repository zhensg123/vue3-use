export default [{
    path: '/combined/ref',
    name: 'ref',
    modules: 'combined',
    title: 'ref相关',
    icon: '',
    component: () => import(/* webpackChunkName: "combined" */ '@/views/combined/Ref.vue')
  },{
    path: '/combined/watch',
    name: 'watch',
    modules: 'combined',
    title: 'watch相关',
    icon: '',
    component: () => import(/* webpackChunkName: "combined" */ '@/views/combined/Watch.vue')
  },{
    path: '/combined/refh',
    name: 'refh',
    modules: 'combined',
    title: 'ref相关2',
    icon: '',
    component: () => import(/* webpackChunkName: "combined" */ '@/views/combined/Refh.vue')
  },{
    path: '/combined/book',
    name: 'book',
    modules: 'combined',
    title: '我的书',
    icon: '',
    component: () => import(/* webpackChunkName: "combined" */ '@/views/combined/book.vue')
  },{
    path: '/combined/onmount',
    name: 'onmount',
    modules: 'combined',
    title: 'onmount',
    icon: '',
    component: () => import(/* webpackChunkName: "combined" */ '@/views/combined/onmount.vue')
  }]

