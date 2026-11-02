import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const plants = [
  { name: 'Snake Plant', category: 'Low Maintenance', cost: 15, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1b7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { name: 'ZZ Plant', category: 'Low Maintenance', cost: 18, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { name: 'Monstera', category: 'Tropical', cost: 25, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { name: 'Fiddle Leaf Fig', category: 'Tropical', cost: 30, image: 'https://images.unsplash.com/photo-1606222873838-89c0a6b73a7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { name: 'Aloe Vera', category: 'Succulents', cost: 12, image: 'https://images.unsplash.com/photo-1596547609652-9fc5d8d1309b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  { name: 'Jade Plant', category: 'Succulents', cost: 14, image: 'https://images.unsplash.com/photo-1646657577317-062e73719ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="navbar-links">
          <span onClick={() => setShowCart(false)}>Home / Plants</span>
          <span onClick={() => setShowCart(true)}>Cart 🛒 ({totalItems})</span>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="products-container">
          {['Low Maintenance', 'Tropical', 'Succulents'].map(category => (
            <div key={category}>
              <h3>{category}</h3>
              <div className="product-grid">
                {plants.filter(p => p.category === category).map(plant => {
                  const inCart = cartItems.some(item => item.name === plant.name);
                  return (
                    <div key={plant.name} className="product-card">
                      <img src={plant.image} alt={plant.name} />
                      <h4>{plant.name}</h4>
                      <p>${plant.cost}</p>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(plant)}
                        disabled={inCart}
                      >
                        {inCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;