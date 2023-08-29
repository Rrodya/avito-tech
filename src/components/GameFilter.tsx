// import React, { useState } from "react";

// type FilterProps = { filterData: Array<{id: number; name: string}>}

// export function GameFilter({filterData}: FilterProps) {
  

//   return (  
//     <div 
//       className="relative" 
//     >
//       <ul 
//         className="sm:w-full h-[50px] flex items-center py-2 px-3 bg-slate-400 flex text-white mt-2"
//         onClick={toggleDrop}
//       >
//         {selected.map(filter => filter.isChecked && <li key={filter.id} className="mr-2">{filter.name}</li>)}
//       </ul>
//       {isDrop && 
//         <div className="absolute w-full bg-slate-500 shadow-md">
//           <ul className="flex p-2 flex-wrap">

//             { filters && filters.map(filter => 
//             <li 
//               key={filter.id} 
//               onClick={() => handleFilter(filter.id)}
//               className="flex items-center mr-2 text-gray-200 hover:bg-slate-200 hover:text-slate-600 cursor-pointer transition-all"
//               style={{ 
//                 backgroundColor: filter.isChecked ? 'white' : '', 
//                 color: filter.isChecked ? 'black' : ''
//               }}

//             >          
//               <p
//                 className="text-sm font-medium px-2"
//               >{filter.name}</p>
//             </li>)}
//           </ul>
//         </div>}
//     </div>
//   )
// }