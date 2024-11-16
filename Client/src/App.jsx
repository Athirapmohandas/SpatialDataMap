import './App.css'
import MapComponent from './MapComponent'
import PolygonComponent from './PolygonComponent'
import AddMapPoints from './AddMapPoints'
import AddPolygonPoints from './AddPolygonPoints'

function App() {

  return (
    <>
      <h1 className='text-red-500'>Spatial Data Map</h1>
      <AddMapPoints/>
            <MapComponent />{" "}

            <AddPolygonPoints/>
            <PolygonComponent/>
    </>
  )
}

export default App
