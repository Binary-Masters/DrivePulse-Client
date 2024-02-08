"use client";
import { FileUp, Home, LayoutDashboard, Settings, Upload } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import Image from "next/image";
import logo from "../../assests/icons/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
interface Items {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}
const SideNave = () => {
  const pathname = usePathname();
  const [users, loading, refetch] = useGetAllUsers(); //get user from mongodb
  const { user } = useAuth();   //current or loggedin user
  // console.log(user);
  const currentUser = users.find(singleUser => singleUser.email === user.email);
  console.log(currentUser);
  const adminMenuList: Items[] = [
    {
      id: 1,
      name: "Dashboard",
      icon: <LayoutDashboard />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Upload",
      icon: <Upload />,
      path: "/dashboard/upload-file",
    },
    {
      id: 3,
      name: "Files",
      icon: <FileUp />,
      path: "/dashboard/files",
    },
    {
      id: 4,    //Only Admin can see this route
      name: "Users-Management",
      icon: <FaUsers />,
      path: "/dashboard/users-management",
    },
  ];

  const userMenuList = adminMenuList.filter(route => route.id < 4)  //user menu list before id 4
  // console.log(userMenuList);

  const anotherMenu: Items[] = [
    {
      id: 1,
      name: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      id: 2,
      name: "Profile",
      icon: <CgProfile />,
      path: "/dashboard/profile",
    },
    {
      id: 3,
      name: "Setting",
      icon: <Settings />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-screen w-[60%] md:w-64 fixed z-50 shadow-sm bg-[#0e1642] mt-20 md:mt-0">
      <div className="hidden p-3 md:block">
        <div className="flex items-center gap-1">
          <Image
            src={logo}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[50px]"
            alt="DrivePulse Logo"
          />
          <div className="">
            <h2
              style={{ letterSpacing: "2px" }}
              className="font-bold text-blue-400 text-[20px] md:text-2xl">
              DRIVE
            </h2>
            <p
              style={{ letterSpacing: "4px" }}
              className="text-[14px] md:text-[20px] font-medium md:-mt-2 -mt-3 text-slate-300">
              PULSE
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 gap-4">
        {
          currentUser?.type === 'admin' ? <div>
            {adminMenuList.map((item, index) => (
              <Link
                href={item?.path}
                key={item?.id}
                className={`${pathname === item.path ? "text-primary" : "text-slate-200"
                  } `}>
                <button
                  className={`flex items-center gap-2 w-full hover:bg-gray-600 px-4 py-2 rounded-md  font-medium `}>
                  <h2 className="text-2xl bg-primary text-white p-2 rounded-xl">
                    {item?.icon}
                  </h2>
                  <h2 className="font-medium">{item?.name}</h2>
                </button>
              </Link>
            ))}
          </div>
            :
            <div>
              {userMenuList.map((item, index) => (
                <Link
                  href={item?.path}
                  key={item?.id}
                  className={`${pathname === item.path ? "text-primary" : "text-slate-200"
                    } `}>
                  <button
                    className={`flex items-center gap-2 w-full hover:bg-gray-600 px-4 py-2 rounded-md  font-medium `}>
                    <h2 className="text-2xl bg-primary text-white p-2 rounded-xl">
                      {item?.icon}
                    </h2>
                    <h2 className="font-medium">{item?.name}</h2>
                  </button>
                </Link>
              ))}
            </div>
        }
      </div>
      <hr className="mt-10" />
      <div className="flex flex-col mt-5 gap-4">
        {anotherMenu.map((item, index) => (
          <Link
            href={item?.path}
            key={item?.id}
            className={`${pathname === item.path ? "text-primary" : "text-slate-200"
              } `}>
            <button
              className={`flex items-center gap-2 w-full hover:bg-gray-600 px-4 py-2 rounded-md  font-medium `}>
              <h2 className="text-2xl bg-primary text-white p-2 rounded-xl">
                {item?.icon}
              </h2>
              <h2 className="font-medium">{item?.name}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNave;
