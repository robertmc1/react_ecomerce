import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

class ProductProvider extends Component {
    state = {
        products:[],
        detailProduct: detailProduct,
        cart: []
    };

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return {products: tempProducts}
        })
    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct: product, cart: [...this.state.cart, product]};
        }, () => {
            console.log(this.state)
        })
    };

    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() =>{
            return {product: tempProducts}
        })


    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
            }} >{/*<button onClick={this.tester}>test me</button>*/}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductContext = React.createContext();

//Provider
//Consumer

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
