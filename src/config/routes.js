import { Router } from '@utils/Router'

Router.get('/', 'auth:root@pages')

Router.get('/about', '@pages/about')

Router.get('/users', 'auth:jwt@users')
Router.post('/users', '@users/store')
Router.get('/users/:id', '@users/show')

Router.post('/login', '@pages/login')

Router.get('/home', 'auth:jwt@pages/home')
