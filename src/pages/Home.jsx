import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

import "swiper/css";
import "swiper/css/pagination";

const heroSlides = [
  {
    id: 1,
    subtitle: "Handcrafted with Care",
    title: "Beautiful Wooden Crafts for Every Home",
    description:
      "Discover timeless handcrafted wooden furniture and home decor designed to bring warmth, comfort, and natural beauty into your space.",
    image:
      "/images/1.avif",
  },
  {
    id: 2,
    subtitle: "Made from Natural Wood",
    title: "Timeless Furniture Built to Last",
    description:
      "Explore carefully crafted wooden furniture that combines natural materials, quality craftsmanship, and everyday comfort.",
    image:
      "/images/3.avif",
  },
  {
    id: 3,
    subtitle: "Crafted for Your Space",
    title: "Bring Warmth and Nature Into Your Home",
    description:
      "Find unique wooden pieces that add character, warmth, and a natural touch to every corner of your home.",
    image:
      "/images/2.avif",
  },
];

function Home() {
  const topSellingProducts = products.filter((product) => product.isTopSelling);

  return (
    <main>
      <section>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          speed={900}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="h-[420px] sm:h-[500px] lg:h-[540px]"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover brightness-[0.65]"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex items-center">
                  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-xl text-white">
                      <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">
                        {slide.subtitle}
                      </p>

                      <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>

                      <p className="mt-5 text-base leading-7 text-stone-100 sm:text-lg">
                        {slide.description}
                      </p>

                      <Link
                        to="/shop"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-700 px-6 py-3.5 font-semibold text-white transition hover:bg-amber-800"
                      >
                        Shop Now
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
              Customer Favorites
            </p>

            <h2 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
              Top-Selling Products
            </h2>

            <p className="mt-3 max-w-2xl text-stone-600">
              Explore some of our most loved handcrafted wooden products.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:text-amber-800"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
