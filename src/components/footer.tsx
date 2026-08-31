import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">Romedo Ventures</div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/products">Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="footer-copy">
          &copy; {year} Romedo Ventures. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
