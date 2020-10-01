import { useContext, useState } from 'react';
import { Elements, ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NumberFormat from 'react-number-format';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import { Scrollbar } from 'components/scrollbar';
import ArrowLeft from 'assets/icons/arrow-left';
import Input from 'components/input';
import Button from 'components/button';
import { useCart } from 'contexts/cart/cart.provider';
import Textarea from 'components/textarea';
import CheckoutForm from 'containers/checkout-form';
import CardSection from 'containers/cardsection';
import OrderSubmit from './order-submit';
import {
  InputBase,
  TextBoxCommonBase,
  TextBoxEnable,
} from 'components/utils/theme';
const initialState = {
  phone_number: '',
  name: '',
  address: '',
  postal_code: '',
  suite: '',
};

const stripePromise = loadStripe('pk_test_51HQfPBG7O85kpbpob80QYQOdQBJYbz1UOKXuvvXjzXJnD5TSna7UkG9KAzTXuBIpGoQy2OhTF7xbMdXpyVaHJtlj00blGJhMAz');
//console.log(stripePromise);
export default function Payment({ formData }) {
  const { dispatch } = useContext(DrawerContext);
  //const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { items, calculatePrice, clearCart } = useCart();

  const onChange = (e) => {
    const { value, name } = e.currentTarget;
   
  };
  if (success) {
    const { name, address, postal_code, suite, phone_number } = formData;
    formData['items'] = items;
    formData['calculatePrice'] = calculatePrice();
    return <OrderSubmit />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
       
         
        <h2 className="font-bold text-24px m-0">Payment</h2>
      </div>

      <Scrollbar className="checkout-scrollbar flex-grow">
        <div className="flex flex-col px-30px pt-20px">
         
          <div className="flex flex-col">
            <span className="flex font-semibold text-gray-900 text-18px mb-15px">
              
            </span>
            <div>
              <Elements stripe={stripePromise}>
                <CheckoutForm formData={formData}/>
              </Elements>
            </div>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}

