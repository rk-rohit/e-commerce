import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component {

    constructor() {
        super();
        this.total_amt = 0;
    }

    deleteItemCart = (id) => {
        this.props.removeItemCart(id);
    }

    increaseQtyCart = (id) => {
        this.props.incrQtyCart(id);
    }

    decreaseQtyCart = (id) => {
        this.props.decrQtyCart(id);
    }

    componentDidMount() {
        this.props.localStorageToCartItem();
    }

    getCartItem = () => {
        let { cart_item, product } = this.props;
        let cart_list = cart_item.length ? cart_item.map(item => {
            let findValue = product.find(product_item => product_item.id === item.id);
            if (findValue)
                return { ...findValue, 'qty': item.qty }
        }) : [];
        return cart_list;
    }

    render() {
        const cart_list = this.getCartItem();
        this.total_amt = 0;
        const cart_item_list = cart_list.length > 0 ? cart_list.map(item => {
            this.total_amt = this.total_amt + item.price * item.qty
            return (
                <div className="card mt-4 mb-4" key={item.id}>
                    <div className="card-body">
                        <div className="col-md-4 col-sm-4 col-xs-12 float-left">
                            <img className="card-img-top" src={item.imgUrl} alt="Card image cap" style={{ height: '80px', width: '80px' }} />
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12 float-right">
                            <h6 className="card-title">{item.name}</h6>
                            <p className="card-text">Price :  {item.price} USD </p>
                            <div className="delete_cart_item">
                                <span onClick={this.decreaseQtyCart.bind(this, item.id)} className="btn btn-sm btn-danger mr-1">-</span>
                                <span className="mx-1">{item.qty}</span>
                                <span onClick={this.increaseQtyCart.bind(this, item.id)} className="btn btn-sm btn-danger mx-1">+</span>
                                <span onClick={this.deleteItemCart.bind(this, item.id)} className="btn btn-sm btn-danger ml-1">Remove</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }) : <h5 className="ml-3 mt-2">No item in cart.</h5>;

        return (
            <div className="row">
                <h3 className="ml-3 mt-3 mb-4">Cart Item</h3>
                <div className="col-12 col-md-12 col-sm-12 col-xs-12" style={{ borderStyle: 'solid', borderWidth: '1px', backgroundColor: '#E8EAEE' }}>
                    {cart_item_list}
                    <div className="col-md-12 my-3">
                        <b>Total Amount :</b> {this.total_amt}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart_item: state.cart_item,
        product: state.product_list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItemCart: (id) => dispatch({ type: 'REMOVE_ITEM_CART', id }),
        incrQtyCart: (id) => dispatch({ type: 'INCREASE_QTY_CART', id }),
        decrQtyCart: (id) => dispatch({ type: 'DECREASE_QTY_CART', id }),
        localStorageToCartItem: ()=> dispatch({type: 'LOCAL_STORAGE_TO_CART'})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);