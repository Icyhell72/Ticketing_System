# Ticketing System API

A Django-based REST API for managing support tickets. This system features role-based access control (Admin vs User) and secure JWT authentication.

## Features
- **Authentication**: JWT (JSON Web Token) login and registration.
- **Roles**: 
  - **Admins**: View all tickets, update status.
  - **Users**: Create tickets, view own history.
- **Ticket Management**: Create, list, filter, and search tickets.

## Tech Stack
- Python 3.x
- Django
- Django REST Framework
- Simple JWT

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticketing_system
   ```

2. **Set up a virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory (same level as `manage.py`) and add your secrets:
   ```env
   SECRET_KEY=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Run Migrations**
   ```bash
   python manage.py migrate
   ```

6. **Start the Server**
   ```bash
   python manage.py runserver
   ```

   The API will be available at `http://127.0.0.1:8000/`.

## API Quick Reference

- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **List/Create Tickets**: `GET/POST /api/tickets/`
- **Token Debugger**: Open `JWT_token_Debuggerr.html` in your browser.

## Resources & References

This project was built using the following official documentation and tutorials:

- [Django Documentation](https://docs.djangoproject.com/) - The official guide.
- [Django REST Framework Docs](https://www.django-rest-framework.org/) - For API structure.
- [Simple JWT Documentation](https://django-rest-framework-simplejwt.readthedocs.io/) - For authentication setup.
- [Dennis Ivy (YouTube)](https://www.youtube.com/@DennisIvy) - Helpful Django tutorials.
