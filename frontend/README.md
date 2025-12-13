# Ticketing System Frontend

The client-side application for the Ticketing System, built with **React** and **Tailwind CSS**. This application provides an intuitive interface for users and admins to manage support tickets, featuring real-time chat and a responsive design.

## Features

- **Modern & Responsive UI**: Custom interface designed from scratch using **Tailwind CSS**. No heavy component libraries—just clean, utility-first CSS.
- **Real-Time Support Chat**: Integrated **Tawk.to** widget for instant communication.
- **Pagination**: User-friendly pagination controls (Next/Previous) to navigate through tickets.
- **Ticket Management**:
    - Users can create, view, and track their tickets.
    - Admins have a comprehensive dashboard to filter and manage all tickets.
- **Secure Authentication**: Seamless integration with the Django backend using JWT.
- **File Attachments**: Easy file upload for providing context to support requests.

## Tech Stack

- **React 19.2.3**: JavaScript library for building user interfaces.
- **Node v22.16.0** / **NPM 10.9.2**: Runtime and package manager.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For client-side routing.

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Icyhell72/Ticketing_System
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

   The app will run in development mode.\
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

   The page will reload when you make changes.\
   You may also see any lint errors in the console.

## Build for Production

To create a production-ready build:

```bash
npm run build
```

This bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Design Template

This project's design was **built entirely from scratch** using Tailwind CSS utility classes. 
We did **not** use any pre-made templates or component libraries (like Material UI or Bootstrap). The "simple template" look is a result of custom Tailwind configuration and manual layout design.

## How to Test Chat Integration

1. Ensure the frontend server is running (`npm start`) and you have internet access.
2. The **Tawk.to widget** should appear in the bottom-right corner of the application.
3. Click the widget to start a chat.
4. To simulate an agent replying, log in to your [Tawk.to Dashboard](https://dashboard.tawk.to/).
5. You can test the real-time messaging between the "user" (frontend) and "agent" (Tawk.to dashboard).

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html) 
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tawk.to Developer Guide](https://developer.tawk.to/)
- [How to Add Tawk.to to React (YouTube Tutorial)](https://www.youtube.com/watch?v=S4dEkkqMGv8)

## Author

**Khaireddine Rhouma**

All Rights Reserved.
