"""create_tables

Revision ID: 0c6cddd89ed3
Revises: 
Create Date: 2024-11-16 12:20:48.849330

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from geoalchemy2 import Geometry

# revision identifiers, used by Alembic.
revision: str = '0c6cddd89ed3'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create point data table
    op.create_table(
        'point_data',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('location', Geometry('POINT', srid=4326), nullable=True),
        sa.Column('description', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Create the polygon_data table
    op.create_table(
        'polygon_data',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('area', Geometry('POLYGON', srid=4326), nullable=False),
        sa.Column('density', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('point_data')
    op.drop_table('polygon_data')