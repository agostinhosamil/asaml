import { Router } from '../utils/Router'

Router.get('/', 'auth:root@pages')

Router.get('/about', '@pages/about')

Router.get('/users', '@users')
Router.post('/users', '@users/store')
