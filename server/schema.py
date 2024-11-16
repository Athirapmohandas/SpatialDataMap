from typing import List
from pydantic import BaseModel


# class PointDataSchema(BaseModel):
#     id: int
#     name: str
#     latitude:float
#     longitude:float
#     description:str

class PolygonDataSchema(BaseModel):
    id: int
    name: str
    area: list[list[float]]

class PointCreate(BaseModel):
    name: str
    latitude:float
    longitude:float
    description:str

class PolygonCreate(BaseModel):
    name: str
    area: list[list[float]]
    density: int
    
    class Config:
        orm_mode = True
    
class PointResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    description:str
    
class Geometry(BaseModel):
    type: str
    coordinates: List[List[List[float]]]

class PolygonFeature(BaseModel):
    type: str
    properties: dict
    geometry: Geometry

class PolygonFeatureCollection(BaseModel):
    type: str
    features: List[PolygonFeature]
    