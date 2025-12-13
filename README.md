# Ticketing System

A robust, full-stack ticketing support system designed to streamline issue tracking and resolution. Built with a powerful Django Rest Framework backend and a dynamic React frontend, styled with Tailwind CSS for a modern, responsive user experience.

## Quick Start

### Backend (Django)
```bash
cd backend
python -m venv venv
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

For detailed instructions, see the [Backend README](backend/README.md) or [Frontend README](frontend/README.md).

## Features

- **Role-Based Access Control**:
  - **Admins**: Full control to view, filter, and manage all tickets.
  - **Users**: Secure access to create and view their own ticket history.
- **Real-Time Communication**: Integrated **Tawk.to** for live support chat.
- **Pagination**: Efficient data loading with server-side pagination (5 tickets per page).
- **Secure Authentication**: JWT-based authentication for secure session management.
- **Modern UI/UX**: Custom-designed interface using **Tailwind CSS** (no pre-built heavy UI libraries).
- **Attachments**: Support for file attachments on tickets.

## Tech Stack

### Backend
- **Framework**: Django 6.0 & Django Rest Framework (DRF)
- **Language**: Python 3.14.2
- **Authentication**: Simple JWT
- **Database**: SQLite 

### Frontend
- **Framework**: React 19.2.3
- **Runtime**: Node v22.16.0 (NPM 10.9.2)
- **Styling**: Tailwind CSS (Custom Design System)
- **State Management**: React Hooks
- **HTTP Client**: Axios

## Repository Structure

The project is divided into two main applications:

- `backend/`: Contains the Django API logic, database models, and authentication views.
- `frontend/`: Contains the React SPA application.

## Links

- **GitHub Repository**: [https://github.com/Icyhell72/Ticketing_System](https://github.com/Icyhell72/Ticketing_System)

## Author

**Khaireddine Rhouma**

All Rights Reserved.
