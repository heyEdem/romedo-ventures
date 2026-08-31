# Romedo Ventures — Prototype Product Requirements Document

**Document:** Prototype PRD  
**Version:** 1.0  
**Status:** Implementation Ready  
**Product:** Romedo Ventures Digital Catalogue

## 1. Product definition

Build a polished, mobile-first digital catalogue that makes Romedo Ventures look modern, helps customers discover products and locations, and converts interest into a phone call or WhatsApp enquiry.

This is a digital storefront, not an e-commerce application.

The core flow is:

`Discover → Explore → Find a product → View details → Call or WhatsApp → Purchase offline`

## 2. Goals and non-goals

### Goals

- Present Romedo as a trustworthy technology retailer.
- Let customers browse categories and products.
- Provide search and catalogue filters.
- Provide useful product specifications and imagery.
- Make WhatsApp and phone contact obvious and reliable.
- Show basic branch/location information.
- Work exceptionally well on mobile.
- Allow non-developers to maintain products through a lightweight CMS.

### Explicit non-goals

Do not build shopping carts, checkout, payments, orders, customer accounts, delivery tracking, stock quantities, branch-level inventory, product comparison, reviews, recommendations, loyalty, or complex analytics.

Never use “Buy Now”, “Add to Cart”, or “Checkout” as calls to action.

## 3. Users and journeys

The primary user is a shopper arriving from Google, social media, WhatsApp, word of mouth, a direct URL, or a physical branch. Their question is: “Does Romedo sell what I need?”

The secondary user is an owner or staff member maintaining the catalogue. Their question is: “Can I add or update products without a developer?”

Required journeys:

1. Homepage → category → product → specifications → WhatsApp/call.
2. Search → optional filters → product → contact.
3. Category page → product grid → product detail.
4. Direct product page → “Ask about this product” → pre-filled WhatsApp message.
5. Mobile user → fast load → readable cards → persistent, usable contact actions.

## 4. Information architecture

```text
/
├── /products
├── /products/[slug]
├── /categories
├── /categories/[slug]
├── /about
└── /contact
```

### Homepage

Include a clear Romedo Ventures identity, a concise value proposition, primary “Explore Products” CTA, secondary “WhatsApp Us” CTA, search, category shortcuts, selected products, locations, and a final contact CTA. Suggested positioning: “Technology for everyday life.” Do not invent company history or facts.

### Catalogue and category pages

Show search, category context, product count, responsive product grid, empty state, and filters appropriate to the available data. Filters may include brand, price band, storage, and category. Filtering must never imply exact stock availability.

### Product detail

Show product name, category, image gallery, description, specifications, disclaimer that price/availability may vary, WhatsApp CTA, phone CTA, and related products only when the relationship is explicit in the content data.

### Locations, about, and contact

Use only verified business facts. Locations may show branch name, general location, phone/contact information, opening hours, and map link when supplied. Contact must expose WhatsApp and telephone actions on mobile and desktop.

## 5. Content model

The CMS must support:

```text
Product
- name, slug, category, brand
- shortDescription, description
- images
- specifications: key/value pairs
- priceLabel (optional; display only)
- featured, published

Category
- name, slug, description, image, displayOrder, published

Branch
- name, address/generalLocation
- phone, WhatsApp, openingHours, mapUrl
```

Use slugs such as `/products/samsung-galaxy-a56`. Slugs must be stable and unique. Products and categories require draft/published visibility; unpublished content must not appear publicly.

## 6. Contact behavior

Keep business contact values in one configuration/content location; never duplicate numbers across components.

Product WhatsApp messages must be generated from product data, for example:

```text
Hi Romedo Ventures, I'm interested in the Samsung Galaxy A56. Is it currently available?
```

Use an encoded `https://wa.me/...` URL and `tel:+233...` for calls. The product page must label the action as an enquiry, not a purchase.

## 7. Recommended prototype architecture

Use a modern React/Next.js frontend deployed to Vercel and a lightweight headless CMS for products, categories, images, and branches. The frontend reads published content through the CMS API. Keep the CMS replaceable so a future Spring Boot/PostgreSQL system can adopt the same conceptual model.

Do not add a custom backend, authentication system, payment provider, inventory database, or operational workflow to the prototype unless a later decision explicitly requires it.

## 8. UX, accessibility, and performance

- Mobile-first responsive layouts; touch targets must be comfortable.
- Clear focus states, semantic headings, alt text, keyboard access, and sufficient contrast.
- Every image needs a useful fallback or alt text.
- Search and filter controls must be understandable without icons alone.
- Loading, empty, and error states must be designed.
- Use optimized responsive images and avoid blocking the first meaningful content.
- Product URLs and metadata should be SEO-friendly.

## 9. Implementation sequence

1. Establish frontend shell, typography, colors, navigation, and responsive layout.
2. Configure CMS schemas and seed representative, verified sample content.
3. Build homepage and category navigation.
4. Build catalogue search, filters, pagination or sensible loading.
5. Build product detail and generated contact links.
6. Build about/contact/locations sections.
7. Add SEO metadata, accessibility polish, loading/error states, and mobile QA.
8. Deploy to Vercel and test the owner demo journey end to end.

## 10. Acceptance criteria

- A visitor can reach any published product from the homepage, category, or search.
- Search finds products by name, brand, and relevant descriptive content.
- Filters update results and can be cleared.
- Product pages show real content and useful specifications.
- WhatsApp opens with the correct product name in the message.
- Call links use the configured business number.
- No cart, checkout, payment, order, or stock-quantity UI exists.
- Unpublished CMS content is not public.
- Layout and contact actions work on a narrow mobile viewport.
- Empty, loading, and failure states are usable.
- The owner can understand the product catalogue and contact flow without explanation.

## 11. Demo data and truthfulness

Use realistic sample products for visual demonstration, but mark or replace any unverified names, specifications, prices, branches, phone numbers, and opening hours before sharing the public link. The prototype must not invent company history or claim inventory it cannot verify.
