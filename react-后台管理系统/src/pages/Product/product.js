import React, { Component } from 'react'
import { Redirect,Switch,Route } from 'react-router-dom';
import ProductHome from './home';
import AddUpdate from './add-update';
import Detail from './detail';


export default class product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' exact component={ProductHome}></Route>
                <Route path='/product/addupdate' component={AddUpdate}></Route>
                <Route path='/product/detail/:id' component={Detail}></Route>
            </Switch>
        )
    }
}
