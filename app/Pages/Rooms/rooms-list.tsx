// import React, {useEffect, useState} from 'react'
// import {proxy} from '../../conf'
// import {useDispatch} from 'react-redux'
// import {setBuildings} from './rooms-slice'
//
// const AddBuildings: React.FC = () => {
//   const dispatch = useDispatch()
//   const [buildings, setBuildingsList] = useState<any>([])
//
//   const getBuildings = async () => {
//     try {
//       const response = await fetch(`${proxy}/buildings/buildings`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       const responseData = await response.json()
//       setBuildingsList(responseData)
//       await dispatch(setBuildings(responseData))
//     } catch (errors) {
//       console.log(errors)
//     }
//   }
//
//   useEffect(() => {
//     getBuildings().then(() => {
//     })
//   }, [])
//
//   return (
//     <div>
//       <div>Search Form</div>
//       <div>Table</div>
//     </div>
//   )
// }
//
// export default AddBuildings
