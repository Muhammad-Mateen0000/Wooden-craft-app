import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [orderMessage, setOrderMessage] = useState("");

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    setOrderMessage("Your order has been placed successfully!");
  };

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        {orderMessage ? (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              ✓
            </div>

            <h1 className="mt-5 text-3xl font-bold text-stone-900">
              Order Placed Successfully
            </h1>

            <p className="mt-3 max-w-md text-stone-600">{orderMessage}</p>

            <Link
              to="/shop"
              className="mt-6 rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800"
            >
              Continue Shopping
            </Link>
          </>
        ) : (
          <>
            <ShoppingBag className="h-14 w-14 text-amber-700" />

            <h1 className="mt-5 text-3xl font-bold text-stone-900">
              Your Cart is Empty
            </h1>

            <p className="mt-3 max-w-md text-stone-600">
              Looks like you haven't added any wooden crafts to your cart yet.
            </p>

            <Link
              to="/shop"
              className="mt-6 rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800"
            >
              Continue Shopping
            </Link>
          </>
        )}
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <p className="mt-2 text-stone-600">
          Review your selected handcrafted wooden products.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-full rounded-lg object-cover sm:w-28"
              />

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  {item.category}
                </p>

                <h2 className="mt-1 text-lg font-semibold text-stone-900">
                  {item.title}
                </h2>

                <p className="mt-2 font-bold text-stone-900">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="flex items-center rounded-lg border border-stone-200">
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="p-2 text-stone-600 transition hover:bg-stone-100 hover:text-amber-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="min-w-10 text-center text-sm font-semibold text-stone-900">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="p-2 text-stone-600 transition hover:bg-stone-100 hover:text-amber-700"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-lg font-bold text-stone-900">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>

                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="h-fit rounded-xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-stone-900">Order Summary</h2>

          <div className="mt-5 border-t border-stone-200 pt-5">
            <div className="flex items-center justify-between text-stone-600">
              <span>Total Amount</span>

              <span className="text-xl font-bold text-stone-900">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="mt-6 w-full rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white transition hover:bg-amber-800"
          >
            Place Order
          </button>

          <Link
            to="/shop"
            className="mt-3 block text-center text-sm font-medium text-amber-700 transition hover:text-amber-800"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
