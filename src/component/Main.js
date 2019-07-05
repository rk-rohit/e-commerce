import React from 'react';
import Product from './Product';
import Cart from './cart';
import Payment from './cart/Payment';

export default function Main() {
    return (
        <div className="container-fluid px-5" style={{ height: '80%', overflowY: 'auto' }}>
            <div className="row mb-5">
                <div className="col-md-8">
                    <Product />
                </div>
                <div className="col-md-4">
                    <Cart />
                </div>
            </div>
            <Payment />
        </div>
    )
}
