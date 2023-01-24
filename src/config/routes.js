import { Router } from '@utils/Router'

Router.get('/', 'auth:root@pages')

Router.get('/about', '@pages/about')

Router.get('/users', 'auth:jwt@users')
Router.post('/users', '@users/store')
Router.get('/users/:id', '@users/show')

Router.post('/login', '@pages/login')

Router.get('/home', 'auth:jwt@pages/home')

Router.group('/admin', 'auth:jwt@pages/index', ({ get, group }) => {
  get('/', '/index')

  get('/products', ':base/products')

  // get('/settings', '/settings')

  // group('/projects', ({ get, group }) => {
  //   get('/create', '@projects/create')

  //   group('/tasks', ({ get }) => {
  //     get('/new', '/new')
  //   })
  // })
})
