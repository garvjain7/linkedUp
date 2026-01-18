# LinkedUp - Social Networking Platform

[![Django](https://img.shields.io/badge/Django-4.2.8-green.svg)](https://djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

LinkedUp is a comprehensive social networking platform built with Django, designed to connect professionals and foster meaningful interactions. It features real-time notifications, premium subscriptions, advanced search capabilities, and analytics to provide insights into user engagement.

## 🚀 Features

### Core Functionality
- **User Authentication & Profiles**: Secure registration, login, and detailed user profiles
- **Posts & Interactions**: Create, share, and engage with posts through comments and reactions
- **Real-time Notifications**: Instant notifications for likes, comments, and follows
- **Feed System**: Personalized content feed with algorithmic ranking
- **Advanced Search**: Find users, posts, and content with powerful search capabilities

### Premium Features
- **Premium Subscriptions**: Enhanced features for power users
- **Analytics Dashboard**: Comprehensive insights into user engagement and content performance
- **Priority Support**: Dedicated support for premium members

### Technical Features
- **RESTful API**: Complete API coverage with Django REST Framework
- **Real-time Updates**: WebSocket support for live notifications
- **Caching**: Redis-based caching for improved performance
- **Background Tasks**: Celery for asynchronous processing
- **Responsive Design**: Mobile-first design with skeleton loaders

## 🛠 Tech Stack

### Backend
- **Django 4.2.8** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Primary database (SQLite for development)
- **Redis** - Caching and session storage
- **Celery** - Background task processing

### Frontend
- **HTML5/CSS3** - Responsive design
- **JavaScript (ES6+)** - Interactive features
- **Skeleton Loaders** - Improved UX during loading

### DevOps & Tools
- **Docker** - Containerization
- **Gunicorn** - WSGI server
- **Nginx** - Reverse proxy
- **pytest** - Testing framework
- **Black/Flake8** - Code formatting and linting

## 📋 Prerequisites

- Python 3.8 or higher
- PostgreSQL (recommended for production) or SQLite (for development)
- Redis (for caching and Celery)
- Docker & Docker Compose (optional, for containerized deployment)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/linkedup.git
cd linkedup
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Configuration
```bash
# Copy the example settings file
cp config/settings_example.py config/settings.py

# Edit config/settings.py with your configuration
# Update SECRET_KEY, database settings, etc.
```

### 5. Database Setup
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 6. Load Sample Data (Optional)
```bash
python scripts/seed_data.py
```

### 7. Run Development Server
```bash
python manage.py runserver
```

Visit `http://localhost:8000` to access the application.

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/linkedup
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/0
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Database Configuration
For PostgreSQL, update `config/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'linkedup_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 📖 Usage

### API Endpoints

#### Authentication
- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/register/` - User registration
- `POST /api/v1/auth/logout/` - User logout

#### Posts
- `GET /api/v1/posts/` - List posts
- `POST /api/v1/posts/` - Create post
- `GET /api/v1/posts/{id}/` - Get post details
- `PUT /api/v1/posts/{id}/` - Update post
- `DELETE /api/v1/posts/{id}/` - Delete post

#### Users
- `GET /api/v1/users/` - List users
- `GET /api/v1/users/{id}/` - Get user profile
- `PUT /api/v1/users/{id}/` - Update user profile

#### Reactions
- `POST /api/v1/reactions/` - Add reaction
- `DELETE /api/v1/reactions/{id}/` - Remove reaction

#### Notifications
- `GET /api/v1/notifications/` - List notifications
- `PUT /api/v1/notifications/{id}/read/` - Mark as read

### Frontend Pages
- `/` - Home feed
- `/profile/` - User profile
- `/notifications/` - Notifications page

## 🧪 Testing

### Run Tests
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=apps --cov-report=html

# Run specific app tests
pytest tests/api/auth/
```

### Code Quality
```bash
# Format code
black .

# Check style
flake8 .

# Sort imports
isort .
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Run migrations in container
docker-compose exec web python manage.py migrate

# Create superuser
docker-compose exec web python manage.py createsuperuser
```

### Production Deployment
1. Set `DEBUG = False` in settings
2. Configure production database (PostgreSQL)
3. Set up Redis for caching
4. Configure Celery for background tasks
5. Set up Nginx as reverse proxy
6. Enable SSL/TLS certificates
7. Configure environment variables

### Environment Setup
```bash
# Install production dependencies
pip install gunicorn whitenoise

# Collect static files
python manage.py collectstatic

# Run with Gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

## 📁 Project Structure

```
linkedup/
├── api/                    # API versioning
│   └── v1/
│       ├── router.py       # API routing
│       └── [app]/          # App-specific API views
├── apps/                   # Django apps
│   ├── auth/              # Authentication
│   ├── users/             # User management
│   ├── posts/             # Posts and content
│   ├── comments/          # Comments system
│   ├── reactions/         # Reactions (likes, etc.)
│   ├── notifications/     # Real-time notifications
│   ├── feed/              # Content feed
│   ├── premium/           # Premium features
│   ├── search/            # Search functionality
│   └── analytics/         # Analytics and insights
├── config/                # Django configuration
│   ├── settings.py        # Main settings
│   ├── urls.py            # URL configuration
│   └── wsgi.py            # WSGI application
├── core/                  # Core utilities
│   ├── cache/             # Caching utilities
│   ├── database/          # Database utilities
│   ├── locking/           # Distributed locking
│   ├── pagination/        # Pagination utilities
│   └── security/          # Security utilities
├── docker/                # Docker configuration
├── media/                 # User uploaded files
├── scripts/               # Utility scripts
├── static/                # Static files (CSS, JS, images)
├── templates/             # HTML templates
├── tests/                 # Test suite
└── requirements.txt       # Python dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 style guidelines
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Django community for the excellent framework
- Django REST Framework for API development
- All contributors and supporters

## 📞 Support

For support, email support@linkedup.com or join our Discord community.

---

**Made with ❤️ by the LinkedUp team**
