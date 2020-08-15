import React from 'react'
// import AddBuildings from './buildings-add'
// import EditBuildings from './buildings-edit'
import BuildingsList from './buildings-list'

const Buildings: React.FC = () => {
  return (
    <div className='container'>
      <h1>Buildings</h1>
      {/*<AddBuildings/>*/}
      {/*<EditBuildings/>*/}
      <BuildingsList/>
    </div>
  )
}

export default Buildings
