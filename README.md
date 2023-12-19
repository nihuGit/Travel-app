# Airbnb Clone

This project is an Airbnb clone built using Next.js, Tailwind CSS, TypeScript, Prisma, NextAuth.js, and Cloudinary. It replicates the core functionalities of Airbnb, allowing users to search for accommodations, view property details, book stays, and manage their bookings. It utilizes several modern technologies and tools for a seamless user experience.

## Features

- **Authentication**: Implemented with NextAuth.js for user authentication.
- **Search Functionality**: Users can search for properties based on various criteria.
- **Property Listings**: Display of properties with details and images
- **Booking System**: Allows users to book accommodations.
- **Image Upload**: Integration with Cloudinary for efficient image storage and retrieval.
- **Data Management**: Utilizes Prisma as an ORM to interact with the database.

## Tech Stack

- **Next.js**: React framework for server-side rendering and routing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Typed JavaScript for improved code quality.
- **Prisma**: Modern database toolkit for data access and management.
- **NextAuth.js**: Authentication library for Next.js applications.
- **Cloudinary**: Cloud-based image and video management platform.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sheharyarahmad842/airbnb-clone.git
```

2. Navigate to the project directory:

```bash
cd airbnb-clone
```

3. Install the dependencies:

```bash
npm install
```

4. Create a .env.local file in the root directory and add the following environment variables:

```
DATABASE_URL=YOUR_MONGODB_URI
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
NEXT_UPLOAD_PRESET=YOUR_CLOUDINARY_UPLOAD_PRESET
```

## Development

1. Run the development server:

```bash
npm run dev
```

2. Open your browser and visit: http://localhost:3000

## Contributing

Please feel free to contribute to the project by adding new features, fixing bugs, or enhancing the user experience. To get started, fork the repository and create a new branch for your feature. Once your changes are complete, submit a pull request.
