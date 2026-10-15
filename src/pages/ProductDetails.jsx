import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowLeft, Star } from "lucide-react";
import products from "../data/products";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((product) => product.id === Number(id));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-stone-900">
          Product not found
        </h1>

        <Link
          to="/shop"
          className="mt-4 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/shop"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-amber-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-stone-100 lg:mx-0">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 w-full object-cover sm:h-[450px]"
          />
        </div>

        <div className="pt-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />

            <span className="font-medium text-stone-800">
              {product.rating}
            </span>

            <span className="text-sm text-stone-500">/ 5 Rating</span>
          </div>

          <p className="mt-4 text-2xl font-bold text-stone-900">
            Rs. {product.price.toLocaleString()}
          </p>

          <div className="mt-4 border-t border-stone-200 pt-4">
            <h2 className="text-lg font-semibold text-stone-900">
              Description
            </h2>

            <p className="mt-2 max-w-xl leading-7 text-stone-600">
              {product.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-5 rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800"
          >
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;