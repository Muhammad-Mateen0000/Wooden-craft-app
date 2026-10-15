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
    <article className="group w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow duration-300 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block min-w-0">
        <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 p-3 pb-0 sm:p-5 sm:pb-0">
          <p className="truncate text-xs font-medium text-amber-700 sm:text-sm">
            {product.category}
          </p>

          <h3 className="mt-1 break-words text-base font-semibold text-stone-900 sm:text-lg">
            {product.title}
          </h3>

          <div className="mt-1.5 flex items-center gap-1 text-stone-600">
            <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm">/ 5</span>
          </div>

          <div className="mt-3 flex min-w-0 flex-wrap items-center justify-between gap-2">
            <p className="break-words text-lg font-bold text-stone-900 sm:text-xl">
              Rs. {product.price.toLocaleString()}
            </p>

            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-700 sm:text-sm">
              View Details
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <div className="p-3 pt-4 sm:p-5 sm:pt-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-amber-700 px-2 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 sm:px-4"
        >
          <ShoppingCart className="h-4 w-4 shrink-0" />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;