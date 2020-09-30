import Link from "next/link";

const Header = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/cart">Cart</Link>
    </nav>
  );
};

export default Header;
