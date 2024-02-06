// import Link from "next/link";
// import { FaRegTrashAlt, FaUserFriends } from "react-icons/fa";
// import { LuFileSpreadsheet } from "react-icons/lu";

// const Analytics = () => {
//     const data = [
//         {
//             id:1,
//             icon:<LuFileSpreadsheet/>,
//             number: 20,
//             desc:"Total files"
//         },
//         {
//             id:2,
//             icon:<FaRegTrashAlt />,
//             number: 14,
//             desc:"Total Trash"
//         },
//         {
//             id:3,
//             icon:<FaUserFriends />,
//             number: 50,
//             desc:"Total Friends"
//         },
//         {
//             id:4,
//             icon:<FaUserFriends />,
//             number: 500,
//             desc:"All Users"
//         },
//         {
//             id:5,
//             icon:<FaUserFriends />,
//             number: 500,
//             desc:"All Users"
//         },
//         {
//             id:6,
//             icon:<FaUserFriends />,
//             number: 500,
//             desc:"All Users"
//         },
//     ]

//     let userData = data.filter(item=> item.id<4);
    

//     return (
//         <div className="grid  lg:grid-cols-3 gap-3">
//             {
//                 userData.map(item=> <Link href={`/details/${item.desc}`} style={{boxShadow:"1px 1px 20px #24207b"}} key={item?.id} className="rounded-md bg-[#090d2b] p-5 space-y-1 flex items-center justify-between">
//                     <h3 className="text-2xl bg-primary text-white p-3 rounded-3xl">{item.icon}</h3>
//                     <div>
//                     <h1 className="text-3xl font-bold text-slate-300">{item.number}</h1>
//                     <p className="font-medium text-gray-400">{item?.desc}</p>
//                     </div>
//                 </Link>)
//             }
//         </div>
//     );
// };

// export default Analytics;