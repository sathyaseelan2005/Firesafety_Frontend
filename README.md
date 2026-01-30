# Fire Services Tools Directory

A comprehensive PPE and fire-safety tools catalog website where users can browse professional equipment and contact manufacturers directly.

## Features

### Public Features
- **Browse Tools Catalog**: View all active fire safety equipment and PPE
- **Advanced Filtering**: Search by name, description, or filter by category
- **Detailed Tool Information**: View specifications, certifications, and manufacturer details
- **Contact Owners**: Submit enquiries through an integrated contact form with email fallback
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Admin Features
- **Admin Authentication**: Secure sign-up and login for manufacturers/owners
- **Tool Management**: Add, edit, and delete tools
- **Image Upload**: Upload multiple product images with drag-and-drop
- **Category Management**: Organize tools by categories
- **Enquiry Dashboard**: View and manage customer enquiries
- **Active/Inactive Toggle**: Control tool visibility

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Authentication**: Supabase Auth (JWT-based)
- **Storage**: Supabase Storage (for tool images)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Database Schema

### Tables
1. **categories** - Tool categories (Gloves, Boots, Helmets, etc.)
2. **owners** - Manufacturer/owner information
3. **tools** - PPE and fire-safety equipment catalog
4. **enquiries** - Customer contact form submissions

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works fine)

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Setup**

The `.env` file is already configured with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Database Setup**

The database schema, storage buckets, and edge functions are already deployed to your Supabase instance:
- ✅ Database tables with RLS policies
- ✅ Storage bucket for tool images
- ✅ Edge function for handling enquiries
- ✅ Sample categories seeded

### Running the Application

**Development Mode**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

**Production Build**
```bash
npm run build
npm run preview
```

## Usage Guide

### For Visitors (Public Users)

1. **Browse Tools**
   - Visit the homepage to see all available tools
   - Use the search bar to find specific tools
   - Filter by category using the dropdown

2. **View Tool Details**
   - Click on any tool card to view full details
   - See specifications, certifications, and manufacturer info
   - View multiple product images

3. **Contact Owner**
   - Click "Contact Owner" button on tool details page
   - Fill in your name, email, and message
   - Submit the form - it will save to the database and open your email client

### For Manufacturers/Owners (Admin)

1. **Sign Up**
   - Click "Admin Login" in the header
   - Click "Don't have an account? Sign Up"
   - Enter company details and credentials
   - Your admin account will be created

2. **Sign In**
   - Click "Admin Login"
   - Enter your email and password

3. **Add Tools**
   - Click "Add New Tool" in your dashboard
   - Fill in tool details (name, category, description)
   - Upload product images (max 5MB each)
   - Add industry standards/certifications
   - Set active/inactive status
   - Click "Create Tool"

4. **Manage Tools**
   - View all your tools in the dashboard
   - Edit tools by clicking "Edit"
   - Delete tools by clicking "Delete"
   - View tool details by clicking "View"

5. **View Enquiries**
   - Switch to "Enquiries" tab in dashboard
   - See all customer enquiries for your tools
   - New enquiries are highlighted
   - View customer contact information and messages

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── ToolCard.tsx    # Tool preview card
│   ├── ContactModal.tsx # Contact form modal
│   └── ToolForm.tsx    # Tool add/edit form
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/               # Utilities and config
│   ├── supabase.ts    # Supabase client
│   └── database.types.ts # TypeScript types
├── pages/             # Page components
│   ├── ToolsList.tsx  # Tools catalog page
│   ├── ToolDetails.tsx # Tool details page
│   ├── Login.tsx      # Admin authentication
│   └── AdminDashboard.tsx # Admin panel
├── services/          # API services
│   └── api.ts         # API functions
└── App.tsx            # Main app with routing
```

## API Reference

### Tools API
- `toolsApi.getAll(categorySlug?)` - Fetch all active tools
- `toolsApi.getById(id)` - Fetch tool details
- `toolsApi.create(tool)` - Create new tool
- `toolsApi.update(id, tool)` - Update tool
- `toolsApi.delete(id)` - Delete tool
- `toolsApi.uploadImage(file)` - Upload tool image

### Categories API
- `categoriesApi.getAll()` - Fetch all categories

### Enquiries API
- `enquiriesApi.submit(enquiry)` - Submit new enquiry
- `enquiriesApi.getAll()` - Fetch all enquiries (admin only)
- `enquiriesApi.updateStatus(id, status)` - Update enquiry status

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel will auto-detect Vite
- Add environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Click "Deploy"

### Supabase Backend

Your Supabase backend is already fully configured and deployed:
- Database tables with RLS
- Storage buckets
- Edge functions
- Authentication enabled

## Security Features

- **Row Level Security (RLS)**: All database tables have RLS policies
- **JWT Authentication**: Secure admin authentication
- **Image Upload Validation**: File size and type restrictions
- **Input Sanitization**: Form validation on client and server
- **Secure API Keys**: Environment variables for sensitive data

## Sample Data

The database includes pre-seeded categories:
- Gloves
- Boots
- Helmets
- Vests
- Masks
- Jackets
- Pants
- Equipment

To add sample tools, sign up as an admin and use the "Add New Tool" feature.

## Troubleshooting

### Build Errors
```bash
npm run typecheck  # Check TypeScript errors
npm run lint       # Check linting issues
```

### Database Issues
- Verify Supabase URL and keys in `.env`
- Check RLS policies in Supabase dashboard
- Ensure tables are created (check migrations)

### Image Upload Issues
- Check file size (max 5MB)
- Verify file type (JPG, PNG, WebP only)
- Check storage bucket permissions in Supabase

## Contributing

To modify or extend the application:

1. **Add New Categories**: Insert into `categories` table via Supabase dashboard
2. **Customize Styling**: Modify Tailwind classes in components
3. **Add Features**: Follow the existing component structure
4. **Update Schema**: Create new migrations in Supabase

## Support

For issues or questions:
- Check Supabase dashboard for backend logs
- Review browser console for frontend errors
- Verify environment variables are set correctly

## License

MIT License - Feel free to use this project for your own purposes.
