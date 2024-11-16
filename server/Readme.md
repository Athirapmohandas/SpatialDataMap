

# SpatialData

View and Add Points in Maps

## Prerequisites

- Python 3.8 or higher
- PostgreSQL with `postgis` extension enabled

## Getting Started

Follow these steps to set up and run the project locally.


### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```


### 2. Create a Virtual Environment

Set up a virtual environment to manage dependencies:

```bash
py -m venv env
.\env\Scriptsctivate
```

### 3. Install Dependencies

Install the necessary packages using the provided `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory based on the `env.example` file:

```plaintext
# Example format
DB_HOST=localhost
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
```

Replace placeholders with your actual environment-specific details.

### 5. Set Up the Database

Enable the required PostgreSQL extension:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### 6. Apply Database Migrations

Run the migrations to set up your database schema:

```bash
alembic upgrade head
```

### 7. Run the Application

Start the development server using Uvicorn:

```bash
uvicorn main:app --reload
```

The application should now be running at [http://127.0.0.1:8000](http://127.0.0.1:8000).





