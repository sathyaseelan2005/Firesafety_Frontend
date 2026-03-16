# Kumaran Safety Equipments — Route Map

## Public interface (base `/`)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing, CTA to products and contact |
| `/products` | Products | Product listing with category filter and search |
| `/products/:productId` | ProductDetails | View product: gallery, description, SKU, category, Active/Inactive badge, WhatsApp enquiry |
| `/contact` | Contact | Dealer enquiry form, contact info, Google Map embed |

## Admin interface (base `/admin`)

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Summary: Total Products, Total Views, Total Enquiries, Conversion Rate |
| `/admin/products` | ProductsList | Table of products; toggle active/inactive; link to view (public) and edit |
| `/admin/products/:productId/edit` | ProductEdit | Edit product: name, SKU, category, description, active, images (fake Cloudinary), standards |
| `/admin/analytics` | Analytics | Most viewed, most enquired, category demand (bar), monthly trend (line), conversion widget |

## Separation

- **View product (public):** `/products/:productId` — read-only, no pricing, WhatsApp enquiry.
- **Edit product (admin):** `/admin/products/:productId/edit` — separate route and layout; local state only.

## Backend

- No backend connection.
- No Axios/fetch/services, no auth, no pricing fields, no real Cloudinary.
- Data from `src/data/*.mock.ts`; mutations update local state (ProductsContext, AnalyticsContext).
- UI is ready for future backend integration.
