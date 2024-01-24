"use client";
import { FileUp, Home, LayoutDashboard, Settings, Upload } from "lucide-react";
import Image from "next/image";
import logo from "@/../../public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Items {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}
const SideNave = () => {
  const pathname = usePathname();
  const menuList: Items[] = [
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
    }
  ];

  const anotherMenu:Items[]=[
    {
      id: 1,
      name: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      id: 2,
      name: "Setting",
      icon: <Settings />,
      path: "/dashboard/settings",
    }
  ]

  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-3">
        <Image width={120} height={100} src={logo} alt="logo" />
      </div>
      <div className="flex flex-col gap-4 mt-5">
        {menuList.map((item, index) => (
          <Link
            href={item?.path}
            key={item?.id}
            className={`${pathname === item.path && "text-primary"} `}>
            <button
              className={`flex items-center gap-1 w-full hover:bg-gray-200 px-4 py-2 rounded-md  font-medium `}>
              {item?.icon}
              <h2>{item?.name}</h2>
            </button>
          </Link>
        ))}
      </div>
      <hr className="mt-10"/>
      <div className="flex flex-col gap-4 mt-5">
        {anotherMenu.map((item, index) => (
          <Link
            href={item?.path}
            key={item?.id}
            className={`${pathname === item.path && "text-primary"} `}>
            <button
              className={`flex items-center gap-1 w-full hover:bg-gray-200 px-4 py-2 rounded-md  font-medium `}>
              {item?.icon}
              <h2>{item?.name}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNave;
