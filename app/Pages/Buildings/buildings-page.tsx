import React from 'react'
import {useSelector} from 'react-redux'
// import BuildingsAdd from './buildings-add'
// import BuildingsEdit from './buildings-edit'
import BuildingsList from './buildings-list'

const BuildingsPage: React.FC = () => {
  const editBuilding = useSelector(
    (state: {
      buildings: any;
      editBuilding: boolean
    }) => state.buildings.editBuilding
  )

  return (
    <div className='container'>
      <h1>Buildings</h1>
      {/*<BuildingsAdd/>*/}
      {/*<BuildingsEdit/>*/}
      <BuildingsList/>
    </div>
  )
}

export default BuildingsPage
