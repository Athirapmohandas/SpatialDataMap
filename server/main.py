from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from shapely.geometry import Point, Polygon
from geoalchemy2.shape import from_shape, to_shape
from database import get_db  
from models import PointData, PolygonData
from fastapi.middleware.cors import CORSMiddleware
from schema import PointCreate,PointResponse,PolygonDataSchema,PolygonCreate, PolygonFeatureCollection,PolygonFeature, Geometry

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Listing one single map point
@app.get("/points/{point_id}", response_model=PointResponse)
def read_point(point_id: int, db: Session = Depends(get_db)):
    point = db.query(PointData).filter(PointData.id == point_id).first()
    if not point:
        raise HTTPException(status_code=404, detail="Point not found")
    shape = to_shape(point.location)
    return {"id": point.id, "name": point.name, "latitude": shape.y, "longitude": shape.x, "description":point.description}


# Listing all Map points
@app.get("/points/")
def list_points(db: Session = Depends(get_db)):
    points = db.query(PointData).all()
    return [
        {"id": p.id, "name": p.name, "latitude": to_shape(p.location).y, "longitude": to_shape(p.location).x, "description":p.description}
        for p in points
    ]
     
# Adding map points to db
@app.post("/points/")
def create_point(data: PointCreate, db: Session = Depends(get_db)):
    point = Point(data.longitude, data.latitude)
    new_point = PointData(name=data.name,description=data.description, location=from_shape(point, srid=4326))
    db.add(new_point)
    db.commit()
    db.refresh(new_point)
    shape= to_shape(new_point.location)
    return {"id": new_point.id, "name": new_point.name,  "latitude": shape.y, "longitude": shape.x,  "description":new_point.description}


# Add polygon points to map
@app.post("/polygons/", response_model=PolygonDataSchema)
def create_polygon(data: PolygonCreate, db: Session = Depends(get_db)):
    if len(data.area) < 4 or data.area[0] != data.area[-1]:
        raise HTTPException(
            status_code=400,
            detail="Area should have at least 4 points and must be closed (first and last points must match)."
        )
    
    polygon_shape = Polygon(data.area)
    polygon = PolygonData(name=data.name,density=data.density, area=from_shape(polygon_shape, srid=4326))
    
    
    db.add(polygon)
    db.commit()
    db.refresh(polygon)
    
    polygon_coords = list(to_shape(polygon.area).exterior.coords)
    
    return {
        "id": polygon.id,
        "name": polygon.name,
        "area": polygon_coords,
        "density":polygon.density
    }
    

# Listing polygon points to map
@app.get("/polygons/", response_model=PolygonFeatureCollection)
def list_polygon(db: Session = Depends(get_db)):
    polygons = db.query(PolygonData).all()
    features = []
    for polygon in polygons:
        geometry = to_shape(polygon.area)
        coordinates = geometry.exterior.coords[:]
        feature = PolygonFeature(
            type="Feature",
            properties={
                "name": polygon.name,
                "density": polygon.density
            },
            geometry=Geometry(
                type="Polygon",
                coordinates=[coordinates]  
            )
        )
        features.append(feature)
        
    return PolygonFeatureCollection(
        type="FeatureCollection",
        features=features
    )