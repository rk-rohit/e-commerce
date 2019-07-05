import React, { Component } from 'react';
import { connect } from 'react-redux';

class Payment extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.name.value === '') {
            this.name.focus();
        } else if (this.email.value === '') {
            this.email.focus();
        } else if (this.mobile.value === '') {
            this.mobile.focus();
        } else {
            let { cart_item, product } = this.props;
            let cart_list = cart_item.length > 0 ? cart_item.map(item => {
                let findValue = product.find(product_item => product_item.id === item.id);
                if (findValue)
                    return { ...findValue, 'qty': item.qty }
            }) : [];

            if (cart_list.length < 1) {
                alert("Please add item to cart")
            } else {
                let total_amt = 0;
                cart_list.forEach(item => {
                    total_amt = total_amt + item.price * item.qty
                });
                alert(`Thank You for shopping ${this.name.value} of amount ${total_amt} USD`);
                this.name.value = '';
                this.email.value = '';
                this.mobile.value = '';
                this.props.clearCart();
                localStorage.removeItem('cart_item');
            }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h4>Please Fill The Detail For the Shopping After adding the item in cart and then press submit.</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" className="form-control" placeholder="Enter Name" ref={input => this.name = input} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Email:</label>
                            <input type="email" id="psw" className="form-control" placeholder="Enter Email" ref={input => this.email = input} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile No:</label>
                            <input type="text" id="mobile" className="form-control" placeholder="Enter Mobile No" ref={input => this.mobile = input} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
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
        clearCart: () => dispatch({ type: 'CLEAR_CART' })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);