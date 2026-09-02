import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('MetadataTest', () => {
  it('layout exports default metadata with title and description', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain("title: 'Romedo Ventures'");
    expect(layout).toContain("description: 'Technology for everyday life.'");
  });

  it('home page exports metadata with title and description', () => {
    const home = readFile('app/page.tsx');
    expect(home).toContain("title: 'Romedo Ventures — Technology for everyday life'");
    expect(home).toContain('description:');
    expect(home).toContain('openGraph');
  });

  it('products page exports metadata with title and description', () => {
    const products = readFile('app/products/page.tsx');
    expect(products).toContain("title: 'Products | Romedo Ventures'");
    expect(products).toContain('description:');
  });

  it('product detail page exports generateMetadata function', () => {
    const productDetail = readFile('app/products/[slug]/page.tsx');
    expect(productDetail).toContain('export function generateMetadata');
    expect(productDetail).toContain('title: `${product.name} — Romedo Ventures`');
    expect(productDetail).toContain('description: product.shortDescription');
    expect(productDetail).toContain('openGraph');
  });

  it('about page exports metadata with title and description', () => {
    const about = readFile('app/about/page.tsx');
    expect(about).toContain("title: 'About | Romedo Ventures'");
    expect(about).toContain('description:');
    expect(about).toContain('openGraph');
  });

  it('contact page exports metadata with title and description', () => {
    const contact = readFile('app/contact/page.tsx');
    expect(contact).toContain("title: 'Contact | Romedo Ventures'");
    expect(contact).toContain('description:');
    expect(contact).toContain('openGraph');
  });

  it('categories index page exports metadata with title and description', () => {
    const categories = readFile('app/categories/page.tsx');
    expect(categories).toContain("title: 'Categories | Romedo Ventures'");
    expect(categories).toContain('description:');
    expect(categories).toContain('openGraph');
  });

  it('category detail page exports generateMetadata function', () => {
    const categoryDetail = readFile('app/categories/[slug]/page.tsx');
    expect(categoryDetail).toContain('export function generateMetadata');
    expect(categoryDetail).toContain('`${category.name} | Romedo Ventures`');
    expect(categoryDetail).toContain('description: category.description');
    expect(categoryDetail).toContain('openGraph');
  });

  it('all public routes have openGraph metadata', () => {
    const pages = [
      'app/page.tsx',
      'app/products/page.tsx',
      'app/products/[slug]/page.tsx',
      'app/about/page.tsx',
      'app/contact/page.tsx',
      'app/categories/page.tsx',
      'app/categories/[slug]/page.tsx',
    ];
    for (const page of pages) {
      const content = readFile(page);
      expect(content).toContain('openGraph');
    }
  });

  it('all public routes have unique titles containing Romedo Ventures', () => {
    const pages = [
      { file: 'app/page.tsx', title: 'Romedo Ventures — Technology for everyday life' },
      { file: 'app/products/page.tsx', title: 'Products | Romedo Ventures' },
      { file: 'app/about/page.tsx', title: 'About | Romedo Ventures' },
      { file: 'app/contact/page.tsx', title: 'Contact | Romedo Ventures' },
      { file: 'app/categories/page.tsx', title: 'Categories | Romedo Ventures' },
    ];
    for (const { file, title } of pages) {
      const content = readFile(file);
      expect(content).toContain(`title: '${title}'`);
    }
  });
});
