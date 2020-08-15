import React from 'react'
// import BuildingsAdd from './buildings-add'
// import BuildingsEdit from './buildings-edit'
import BuildingsList from './buildings-list'

const Buildings: React.FC = () => {
  return (
    <div className='container'>
      <h1>Buildings</h1>
      {/*<BuildingsAdd/>*/}
      {/*<BuildingsEdit/>*/}
      <BuildingsList/>
    </div>
  )
}

export default Buildings
