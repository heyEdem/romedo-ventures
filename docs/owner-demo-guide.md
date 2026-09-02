# Romedo Ventures — Owner End-to-End Demo Guide

This guide provides a step-by-step walkthrough for testing the Romedo Ventures website prototype. Follow these steps to verify all features work correctly.

## Prerequisites

- Access to the deployed preview URL (provided separately)
- A mobile device or desktop browser
- WhatsApp installed (for contact link testing)
- Phone capability (for call link testing)

## Demo Steps

### 1. Homepage Review

**URL:** `/`

1. Open the homepage
2. Verify the Romedo Ventures logo and branding appear
3. Check that the navigation menu displays all main sections
4. Review the hero section with the main value proposition
5. Scroll down to see featured categories and products
6. Verify all images load correctly

**What to look for:**
- Does the homepage feel professional and trustworthy?
- Is the Romedo branding consistent throughout?
- Are the featured products relevant to your business?

### 2. Category Browsing

**URL:** `/categories`

1. Click "Categories" in the navigation menu
2. Browse the list of product categories
3. Verify each category shows:
   - Category name
   - Product count
   - Category image
4. Click on a category to view its products

**What to look for:**
- Are all your product categories listed?
- Are the category names accurate?
- Do the category images represent your products well?

### 3. Product Search and Filtering

**URL:** `/products`

1. Navigate to the product catalogue
2. Use the search bar to search for a specific product
3. Try filtering by category
4. Test the "Clear filters" button
5. Verify search results update in real-time

**What to look for:**
- Can you find products you actually sell?
- Are the search results accurate?
- Do the filters work as expected?

### 4. Product Details

**URL:** `/products/[product-slug]`

1. Click on any product to view its details
2. Verify the product page shows:
   - Product name
   - Product description
   - Product images
   - Price (if applicable)
   - Specifications (if applicable)
3. Scroll down to see related products

**What to look for:**
- Are the product details accurate?
- Are the product images clear and representative?
- Is the pricing information correct?

### 5. Contact Actions

**URL:** Any product detail page

1. On a product detail page, locate the contact buttons
2. Click the "WhatsApp" button
3. Verify it opens WhatsApp with a pre-filled message
4. Go back and click the "Call" button
5. Verify it initiates a phone call

**What to look for:**
- Do the WhatsApp messages make sense?
- Are the phone numbers correct?
- Is the call-to-action clear?

### 6. Branch Locations

**URL:** `/about` or `/contact`

1. Navigate to the About or Contact page
2. Scroll to the branch locations section
3. Verify each branch shows:
   - Branch name
   - Location/address
   - Phone number
   - WhatsApp number (if available)
   - Operating hours (if available)
4. Click on a branch's WhatsApp or phone link

**What to look for:**
- Are all your branches listed?
- Is the contact information accurate?
- Are the operating hours correct?

### 7. Mobile Responsiveness

**Test on a mobile device or browser DevTools:**

1. Open the homepage on mobile
2. Verify the navigation menu collapses into a hamburger menu
3. Test the mobile menu toggle
4. Scroll through all pages on mobile
5. Check that images and text resize properly
6. Test the contact buttons on mobile

**What to look for:**
- Is the mobile experience smooth?
- Are all buttons easy to tap on mobile?
- Does the content read well on small screens?

### 8. About Page

**URL:** `/about`

1. Navigate to the About page
2. Review the company description
3. Check the team or company values section
4. Verify the contact information is correct

**What to look for:**
- Does the About page accurately describe Romedo?
- Is the company information up to date?

### 9. Contact Page

**URL:** `/contact`

1. Navigate to the Contact page
2. Review the contact form (if available)
3. Check the WhatsApp and phone contact options
4. Verify the branch information is displayed

**What to look for:**
- Is it easy to contact Romedo through this page?
- Are all contact methods working?

## What to Report Back

Please provide feedback on:

1. **Accuracy:** Are any products, categories, or business information wrong?
2. **Completeness:** What important information is missing?
3. **Usability:** Is anything confusing or hard to find?
4. **Design:** Does the website feel like Romedo?
5. **Value:** Would this be useful to your customers?

## Limitations of This Prototype

This is a **read-only catalogue** prototype. The following features are **not included**:

- Online shopping cart or checkout
- Payment processing
- Order management
- Stock quantity tracking
- User accounts or login
- Online ordering

The prototype is designed to help customers **discover products** and **contact the shop directly** via WhatsApp or phone.

## Technical Notes

- The prototype is built with Next.js and deployed on Vercel
- All product data is stored in a local CMS (not connected to your inventory system)
- Contact links use your configured WhatsApp and phone numbers
- The website is fully responsive and works on all devices
- SEO metadata is included for better search engine visibility

## Next Steps

After testing, we can discuss:

1. **Content updates:** Any corrections to product or business information
2. **Additional features:** What functionality would be most valuable?
3. **CMS integration:** Connecting to your actual product inventory
4. **Domain and deployment:** Moving from preview to production

---

*This prototype was built to demonstrate a modern, mobile-first website for Romedo Ventures. Your feedback is valuable and will help shape the final product.*
