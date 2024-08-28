# Kusina Kollect

## Overview
Kusina Kollect is a digital hub for Filipino recipes. Users can explore, save, and contribute to a diverse collection of dishes, fostering a community-driven platform that celebrates Filipino cuisine.

A deployed version of this app is available here: [Kusina Kollect](https://kusina-kollect.vercel.app/)

## Built with
This project leverages Next.js 14 with TypeScript and TailwindCSS for a robust and scalable front-end experience. <br>
User authentication is seamlessly integrated through Clerk. <br>
Forms are crafted using shadcn and React Hook Form, with validation powered by zod. <br>
The backend is driven by MongoDB with Mongoose for data management, and uploadthing is utilized for efficient asset storage.

## Features
1. **Recipe Search and Browse**: Users can search for Filipino recipes and browse through different categories (meals, cuisines, ingredients) without having to create an account.
2. **User Authentication**:  Implements a robust authentication system powered by Clerk that enables users to securely register and log in to access more features of Kusina Kollect.
3. **Favorite Recipes**: Logged-in users can save recipes to their favorites for easy access.
4. **Recipe Submission**: Users can submit their own recipes for inclusion in the website.
5. **My Profile**: Users can visit their own profile page to edit their profile information and view their submitted recipes.
6.  **Recipe Moderation**: Admins can approve or reject submitted recipes to maintain quality content.

## Screens

## Run the project locally
1. Clone the repository
   ```
   git clone https://github.com/your-username/kusina-kollect.git
   ```
2. [Add steps for setting up any necessary accounts or obtaining API keys]
3. Create a `.env` file in the root directory of the project and add your environment variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-key-here
   CLERK_SECRET_KEY=your-key-here
   
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   MONGODB_URL=your-mongodb-url-here

   UPLOADTHING_SECRET=your-secret-here
   UPLOADTHING_APP_ID=your-app-id-here
   ```
4. Install the dependencies
   ```
   npm install
   ```
5. Run the development server
   ```
   npm run dev
   ```
6. Open [localhost:3000](http://localhost:3000) in your browser.

**Enjoy exploring Filipino cuisine with Kusina Kollect!**

###### This project was created as a personal project in 2024.
