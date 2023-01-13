import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import Header from '../components/Header';
import { getItem } from '../services/LocalStorage';

export default class Cart extends Component {
  state = {
    countItens: 0,
  };

  componentDidMount() {
    this.checkLocalStorageItem();
  }

  checkLocalStorageItem() {
    const myCart = getItem('cartItens');
    if (myCart === null) {
      this.setState({
        countItens: 0,
      });
    } else {
      this.setState({
        countItens: myCart.length || 0,
      });
    }
  }

  render() {
    const { countItens } = this.state;
    const myCart = getItem('cartItens');
    return (
      <div>
        <Header />
        <section className="cart-content">
          <Link
            to="/"
          >
            <TiArrowBack className="cart-back-icon" />
          </Link>
          <div className="cart-message">
            {
              localStorage.length === 0 ? (
                <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              )
                : myCart.map((item) => (
                  <div key={ item.id }>
                    <span data-testid="shopping-cart-product-name">{item.title}</span>
                    <img src={ item.thumbnail } alt={ item.title } />
                  </div>
                ))

            }
            <p data-testid="shopping-cart-product-quantity">{countItens}</p>
          </div>
        </section>
      </div>
    );
  }
}
