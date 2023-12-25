import Home from './views/Home/index'
import Login from './views/Login/index'
import Register from './views/Register/index'
import NotExist from './views/_404NotExist'

const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '*',
        element: <NotExist/>
    }
]

export default routes