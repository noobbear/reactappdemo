import React from 'react';
import { renderRoutes } from "react-router-config";
import { Router} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Hello from './Hello'
import SayHi from './SayHi'
import App from './App'

const routes = [{
    path:'/hello',
    component: Hello,
    exact:true
},{
    path:'/hi',
    component: SayHi,
    exact:true
},{
    path:['/',"*"],
    component: App,
    exact:true
},]

export  default  class Routes extends React.Component{
    render() {
        return(
            <Router history={createBrowserHistory()}>
                { renderRoutes(routes)}
        </Router>)

    }
}