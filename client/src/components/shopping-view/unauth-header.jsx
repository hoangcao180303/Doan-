// HeaderUnauth.jsx
import { Link } from "react-router-dom";

function HeaderUnauth() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <span className="font-bold">Ecommerce</span>
        </Link>
        <nav>
          <Link to="/auth/login" className="mr-4">Login</Link>
          <Link to="/auth/register">Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default HeaderUnauth;