import React, { Component } from 'react';
import { connect } from 'react-redux';

class Product extends Component {

    addCart = (id) => {
        this.props.addToCart(id);
    }

    render() {
        let { product } = this.props;
        const product_list = product.length ? product.map(item => {
            return (
                <div className="col-md-4 col-sm-6 col-xs-12" key={item.id}>
                    <div className="card mt-4">
                        <img className="card-img-top" style={{ height: '200px' }} src={item.imgUrl} alt="Card image cap" />
                        <div className="card-body">
                            <h6 className="card-title">{item.name}</h6>
                            <p className="card-text">Price :  {item.price} USD </p>
                            <button onClick={this.addCart.bind(this, item.id)} className="btn btn-primary">Add to cart</button>
                        </div>
                    </div>
                </div>
            );
        }) : "No Product";

        return (
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <h3 className="mt-3">Product List</h3>
                    <div className="row">
                        {product_list}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product_list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => dispatch({ type: 'ADD_TO_CART', id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);