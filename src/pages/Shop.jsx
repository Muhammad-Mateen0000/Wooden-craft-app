import { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = [
  "All Products",
  "Furniture",
  "Home Decor",
  "Kitchen",
  "Office",
  "Toys & Gifts",
];

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOption, setSortOption] = useState("default");

  const displayedProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (selectedCategory !== "All Products") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOption === "price-low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "alphabetical") {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOption === "rating") {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    return filteredProducts;
  }, [selectedCategory, sortOption]);

  return (
    <main className="mx-auto w-full max-w-7xl overflow-x-clip px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* Page Header */}
      <header className="mb-7 sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 sm:text-sm">
          Explore Our Collection
        </p>

        <h1 className="mt-2 text-2xl font-bold text-stone-900 sm:text-4xl">
          Shop Wooden Crafts
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
          Explore our collection of handcrafted wooden furniture, home decor,
          kitchen essentials, and more.
        </p>
      </header>

      {/* Categories and Products */}
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        {/* Categories */}
        <aside className="w-full min-w-0 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3 sm:p-4 lg:sticky lg:top-24">
          <h2 className="mb-3 px-1 text-base font-semibold text-stone-900 sm:text-lg">
            Categories
          </h2>

          <div className="flex w-full min-w-0 flex-wrap gap-2 lg:flex-col">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`max-w-full rounded-lg border px-3 py-2 text-left text-sm font-medium transition-all duration-200 sm:px-4 sm:py-2.5 lg:w-full ${
                  selectedCategory === category
                    ? "border-amber-700/20 bg-amber-700 text-white shadow-sm"
                    : "border-stone-200 bg-white text-stone-600 hover:border-amber-700/30 hover:bg-amber-50 hover:text-amber-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        {/* Products Section */}
        <section className="w-full min-w-0 max-w-full">
          {/* Product Count and Sorting */}
          <div className="mb-5 flex w-full min-w-0 flex-col gap-3 rounded-xl border border-stone-200/80 bg-white p-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <p className="text-sm text-stone-600">
              <span className="font-semibold text-stone-900">
                {displayedProducts.length}
              </span>{" "}
              products found
            </p>

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              aria-label="Sort products"
              className="w-full min-w-0 max-w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10 sm:w-auto"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="alphabetical">Alphabetical Order</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Responsive Product Grid */}
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {displayedProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
              <p className="font-semibold text-stone-800">
                No products found
              </p>

              <p className="mt-2 text-sm text-stone-500">
                Try selecting another category.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Shop;