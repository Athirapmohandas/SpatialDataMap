from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2 import Geometry
from geoalchemy2 import Geometry, WKBElement
from sqlalchemy.orm import Mapped, mapped_column

Base = declarative_base()

class PointData(Base):
    __tablename__ = 'point_data'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(Geometry(geometry_type="POINT", srid=4326, spatial_index=True))
    description = Column(String, nullable=False)
    
    
class PolygonData(Base):
    __tablename__ = 'polygon_data'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    area = Column(Geometry("POLYGON"), nullable=False)
    density = Column(Integer, nullable=False)