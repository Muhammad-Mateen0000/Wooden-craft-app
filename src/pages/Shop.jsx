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
        (product) => product.category === selectedCategory,
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
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
          Explore Our Collection
        </p>

        <h1 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
          Shop Wooden Crafts
        </h1>

        <p className="mt-3 max-w-2xl text-stone-600">
          Explore our collection of handcrafted wooden furniture, home decor,
          kitchen essentials, and more.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Categories</h2>

          <div className="mt-4 flex gap-2 overflow-x-auto lg:flex-col">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-amber-700 text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-stone-600">
              {displayedProducts.length} products found
            </p>

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-amber-700"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="alphabetical">Alphabetical Order</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Shop;
