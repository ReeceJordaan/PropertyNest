# PropertyNest - Real Estate Platform

PropertyNest is a lightweight, framework-free real estate platform built with PHP/MySQL and vanilla JavaScript, offering property listings with advanced search/filter capabilities for buyers, renters, and agents. Features include user authentication, favorites system, mortgage calculators, and responsive design - all without external dependencies for optimal performance.

## Project Overview
PropertyNest is a comprehensive real estate platform that enables users to browse, search, and manage property listings. The system provides:
- Property listings with detailed information
- User authentication and profiles
- Advanced search and filtering capabilities
- Mortgage calculators and agent directories
- Favorites system for saved properties

Target audience: Home buyers, renters, and real estate professionals.

## Key Features

### Property Listings
- Browse properties for sale or rent
- Detailed property views with images
- Toggle between buy/rent modes
- Sort by price, title (ascending/descending)
- Filter by bedrooms, bathrooms, price range

### User System
- Secure registration and login
- Profile picture upload
- Dark/light theme preference
- Saved filters for personalized searches
- Favorites system for properties

### Additional Tools
- Mortgage calculators
- Agent directory
- Responsive design for all devices

## Technical Stack

### Frontend
- Vanilla JavaScript for dynamic content
- CSS for styling with responsive design
- HTML5 semantic markup
- No external frameworks (pure JS implementation)

### Backend
- PHP API endpoints
- MySQL database
- RESTful architecture
- JSON request/response format

### DevOps
- Git version control

## Data Management
- User data stored securely with password hashing
- Property listings include:
  - Location details
  - Pricing information
  - Amenities and features
  - High-quality images
- All data accessed through secure API endpoints

## Performance Considerations
- Lazy loading of property images
- Client-side sorting/filtering to reduce server load
- Minimal external dependencies for faster loading
- Efficient database queries with proper indexing