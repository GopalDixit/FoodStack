import React, { useState } from 'react';

const CartItem = ({ cart = [], removeFromCart, total }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  if (cart.length === 0) {
    return null;
  }

  const handlePayment = async (amount) => {

    const URL = 'https://foodstack-xp5k.onrender.com/api/payment/order';

    try {
      setIsLoading(true);
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        throw new Error("Payment failed");
      }

      const data = await res.json();
      console.log("Data is", data);
      handlePaymentVerify(data.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: ({}).RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Gopal Dixit",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch('https://foodstack-xp5k.onrender.com/api/payment/verify', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });

          const verifyData = await res.json();

          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item._id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-semibold dark:text-gray-300">{item.name}</p>
              <p className="text-gray-500 dark:text-white">
                Price: ₹{item.price.toFixed(2)}{' '}
                <span className="text-black dark:text-white font-bold">(x{item.quantity})</span>
              </p>
            </div>
            <button
              className="text-red-500 hover:underline"
              onClick={() => removeFromCart(item)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-xl font-semibold dark:text-gray-300">Total: ₹{total}</h3>
      </div>
      {/* Razorpay button */}
      <div className="text-center mt-8">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
          onClick={() => handlePayment(total)} // Use total instead of item.price
          disabled={isLoading}
        >
          Proceed to Purchase
        </button>
        <div className='mt-4'></div>
      </div>
    </div>
  );
};

export default CartItem;
