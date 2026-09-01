import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('NavigationTest', () => {
  it('header component includes all navigation links', () => {
    const header = readFile('components/header.tsx');
    expect(header).toContain('/products');
    expect(header).toContain('/categories');
    expect(header).toContain('/about');
    expect(header).toContain('/contact');
  });

  it('footer component includes navigation links', () => {
    const footer = readFile('components/footer.tsx');
    expect(footer).toContain('/products');
    expect(footer).toContain('/categories');
    expect(footer).toContain('/about');
    expect(footer).toContain('/contact');
  });

  it('products page renders product content', () => {
    const page = readFile('app/products/page.tsx');
    expect(page.toLowerCase()).toContain('product');
  });

  it('categories page renders category content', () => {
    const page = readFile('app/categories/page.tsx');
    expect(page.toLowerCase()).toContain('categor');
  });

  it('about page renders about content', () => {
    const page = readFile('app/about/page.tsx');
    expect(page.toLowerCase()).toContain('about');
  });

  it('contact page renders contact content', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page.toLowerCase()).toContain('contact');
  });
});

describe('HomepageTest', () => {
  it('exposes Explore Products primary action', () => {
    const page = readFile('app/page.tsx');
    expect(page).toContain('Explore Products');
    expect(page).toContain('href="/products"');
  });

  it('exposes WhatsApp Us secondary action', () => {
    const page = readFile('app/page.tsx');
    expect(page).toContain('WhatsApp Us');
    expect(page).toContain('wa.me');
  });
});

describe('ResponsiveSmokeTest', () => {
  it('globals.css defines mobile-first breakpoint variables', () => {
    const css = readFile('app/globals.css');
    expect(css).toContain('--bp-sm');
    expect(css).toContain('--bp-md');
    expect(css).toContain('--bp-lg');
  });

  it('header has mobile menu toggle', () => {
    const header = readFile('components/header.tsx');
    expect(header).toContain('mobile-menu-toggle');
    expect(header).toContain('mobile-nav');
  });

  it('globals.css defines responsive header behavior', () => {
    const css = readFile('app/globals.css');
    expect(css).toContain('.site-nav');
    expect(css).toContain('@media');
    expect(css).toContain('.mobile-menu-toggle');
  });

  it('contact page includes WhatsApp and phone CTAs', () => {
    const contact = readFile('app/contact/page.tsx');
    expect(contact).toContain('buildGeneralWhatsAppUrl');
    expect(contact).toContain('buildTelUrl');
  });

  it('layout provides semantic page wrapper', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain('page-wrapper');
    expect(layout).toContain('page-content');
  });
});

describe('ShellStructureTest', () => {
  it('layout includes header and footer components', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain('@/components/header');
    expect(layout).toContain('@/components/footer');
  });

  it('layout uses html lang attribute', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain('lang="en"');
  });

  it('layout sets semantic metadata', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain('Romedo Ventures');
    expect(layout).toContain('Technology for everyday life');
  });

  it('header has banner landmark role', () => {
    const header = readFile('components/header.tsx');
    expect(header).toContain('role="banner"');
  });

  it('footer has contentinfo landmark role', () => {
    const footer = readFile('components/footer.tsx');
    expect(footer).toContain('role="contentinfo"');
  });
});
