import { path } from "../utils/consts";
import Login from "./login";
import Register from "./register";
import Contacts from "./contacts";
import Contact from "./contact";


export const pages = [
    {element: <Login/>, path: path.LOGIN},
    {element: <Register/>, path: path.REGISTER}
]


export const authPages = [
    {element: <Contacts/>, path: path.CONTACTS},
    {element: <Contact/>, path: path.CONTACT + '/:id'}
]