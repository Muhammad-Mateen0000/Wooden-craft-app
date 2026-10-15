import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-amber-700" : "text-stone-600 hover:text-amber-700"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-amber-50 text-amber-700"
        : "text-stone-600 hover:bg-stone-100 hover:text-amber-700"
    }`;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-stone-900 transition hover:text-amber-700"
        >
          Wood<span className="text-amber-700">Craft</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>

          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative text-stone-700 transition hover:text-amber-700"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-700 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hidden text-sm font-medium text-stone-700 transition hover:text-amber-700 md:block"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 md:block"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden text-sm font-medium text-stone-700 transition hover:text-amber-700 md:block"
            >
              Logout
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-stone-700 transition hover:text-amber-700 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-stone-200 bg-stone-50 px-4 py-3 md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1">
            <NavLink
              to="/"
              end
              className={mobileNavLinkClass}
              onClick={closeMenu}
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={mobileNavLinkClass}
              onClick={closeMenu}
            >
              Shop
            </NavLink>

            <NavLink
              to="/cart"
              className={mobileNavLinkClass}
              onClick={closeMenu}
            >
              Cart
            </NavLink>

            <div className="my-2 border-t border-stone-200" />

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-amber-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-amber-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-amber-800"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-amber-700"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
