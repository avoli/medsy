import { useContext, useState } from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useCart } from 'contexts/cart/cart.provider';
import CardSection from './cardsection';
import OrderSubmit from './drawer/views/order-submit';
import  Moment from "react-moment";

export default function CheckoutForm({ formData }) {

  const stripe = useStripe();
  const elements = useElements();
  const success1 = false;
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, calculatePrice, clearCart } = useCart();
  const btn_style = {
      color: "white",
      backgroundColor: "#212121",
      paddingLeft: "30px",
      paddingRight: "30px",
      height: "2.75rem",
      width: "100%",
      borderRadius: "5px",
      marginTop: "30px",
    };
  const handleSubmit = async () => {
    event.preventDefault();
    

    if (!stripe || !elements) {
      return;
    }
      
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

     const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token.id, card);
      const { name, address, postal_code, suite, phone_number, calculatePrice, items } = formData;
    
       console.log(phone_number);
      // return;
    //  return <OrderSubmit />;
	    const res = await fetch('/api/order', {
	      method: 'POST',
	      body: JSON.stringify({
	        items: items
	          .map((item) => `${item.name} - ${item.quantity}`)
	          .toString(),
	        address: `${name} ${address} ${postal_code} ${suite}`,
	        phone_number: phone_number,
	        email: 'email@email.com',
	        bill_amount: calculatePrice,
          token: result.token.id,
          qty: items
            .map((item) => `${item.quantity}`)
            .toString(),
          order_date: new Date().toISOString()
	      }),
	    });
	    if (res.status === 200) {
        console.log('ddd');
	      setSuccess(true);
        clearCart();
	    } else {
	      setSuccess(false);
	    }
    }
  };

   if (success) {
      return <OrderSubmit />;
    }

  return ( 
      <div>
        <form onSubmit={handleSubmit}>
          <CardSection />
          <button style={btn_style} className="big flex-shrink-0" disabled={!stripe} >
            Buy Now
          </button>
        </form>
      </div>
    );
}