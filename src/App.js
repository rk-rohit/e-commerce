import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './component/Header';
import Product from './component/Product';
import Cart from './component/cart';
import Main from './component/Main.js';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Navbar />
				<div className="container-fluid px-5">
					<Switch>
						<Route exact path='/' component={Main} />
						<Route path='/product' component={Product} />
						<Route path='/cart' component={Cart} />
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
