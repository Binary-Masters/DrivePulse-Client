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
  const [users] = useGetAllUsers(); //get user from mongodb
  const { user } = useAuth(); //current or loggedin user
  // console.log(user);
  const currentUser = users.find(
    (singleUser) => singleUser.email === user.email
  );
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
      path: "/dashboard/files/root",
    },
    {
      id: 4, //Only Admin can see this route
      name: "Users-Management",
      icon: <FaUsers />,
      path: "/dashboard/users-management",
    },
    // {
    //   id: 5,
    //   name: "Trash",
    //   icon: <FaUsers />,
    //   path: "/dashboard/trash",
    // },
  ];

  const userMenuList = adminMenuList.filter((route) => route.id < 4); //user menu list before id 4
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
      path: "/dashboard/setting",
    },
  ];

  return (
    <div className="min-h-screen w-[60%] md:w-64 fixed z-50 shadow-sm bg-[#0e1642] mt-20 md:mt-0 overflow-y-auto">
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
              className="font-bold text-blue-400 text-[20px] md:text-2xl"
            >
              DRIVE
            </h2>
            <p
              style={{ letterSpacing: "4px" }}
              className="text-[14px] md:text-[20px] font-medium md:-mt-2 -mt-3 text-slate-300"
            >
              PULSE
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 gap-2">
        {currentUser?.type === "admin" ? (
          <>
            {adminMenuList.map((item) => (
              <Link
                href={item?.path}
                key={item?.id}
                className={`${
                  pathname === item.path ? "text-primary" : "text-slate-200"
                } `}
              >
                <button
                  className={`flex items-center gap-2 w-full hover:bg-gray-600 px-4 py-2 rounded-md  font-medium `}
                >
                  <h2 className="p-2 text-2xl text-white bg-primary rounded-xl">
                    {item?.icon}
                  </h2>
                  <h2 className="font-medium">{item?.name}</h2>
                </button>
              </Link>
            ))}
          </>
        ) : (
          <>
            {userMenuList.map((item) => (
              <Link
                href={item?.path}
                key={item?.id}
                className={`${
                  pathname === item.path ? "text-primary" : "text-slate-200"
                } `}
              >
                <button
                  className={`flex items-center gap-2 w-full hover:bg-gray-600 px-4 py-2 rounded-md  font-medium `}
                >
                  <h2 className="p-2 text-2xl text-white bg-primary rounded-xl">
                    {item?.icon}
                  </h2>
                  <h2 className="font-medium">{item?.name}</h2>
                </button>
              </Link>
            ))}
          </>
        )}
      </div>
      <hr className="my-5" />
      <div className="flex flex-col gap-2">
        {anotherMenu.map((item) => (
          <Link
            href={item?.path}
            key={item?.id}
            className={`${
              pathname === item.path ? "text-primary" : "text-slate-200"
            } `}
          >
            <button
              className={`flex items-center gap-2 w-full hover:bg-gray-600 px-4 py-2 rounded-md  font-medium `}
            >
              <h2 className="p-2 text-2xl text-white bg-primary rounded-xl">
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
