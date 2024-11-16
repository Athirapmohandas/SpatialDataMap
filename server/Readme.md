<!-- after cloning create virtual environment -->

py -m venv env
.\env\Scripts\activate

<!-- install all packages -->
pip install -r requirements.txt


create .env file based on env.example


<!-- create extension in postgrese database (our db) -->
CREATE EXTENSION IF NOT EXISTS postgis;

<!-- install db migration files -->
alembic upgrade head


<!-- run application -->
uvicorn main:app --reload

