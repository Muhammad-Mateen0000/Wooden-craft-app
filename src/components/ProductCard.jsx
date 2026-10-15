import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow duration-300 hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 pb-0">
          <p className="text-sm font-medium text-amber-700">
            {product.category}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-stone-900">
            {product.title}
          </h3>

          <div className="mt-1.5 flex items-center gap-1 text-stone-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm">/ 5</span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-xl font-bold text-stone-900">
              Rs. {product.price.toLocaleString()}
            </p>

            <span className="flex items-center gap-1 text-sm font-semibold text-amber-700">
              View Details
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 pt-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;