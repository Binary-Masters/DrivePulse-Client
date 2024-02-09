import { Settings } from "lucide-react";
import Link from "next/link";
const Dropdown = () => {
  return (
    <div className="absolute top-0 right-3 p-4">
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className=" m-1">
          <Settings />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu  shadow absolute -right-8  rounded-xl   "
        >
          <Link href="/dashboard/profile/edit">
            <button className="btn btn-accent btn-md mb-1 text-sm">
              Edit Profile
            </button>
          </Link>

          {/* edit */}
          {/*dynamic path  */}
          {/* /dashboard/profile/password */}
          <Link href="/dashboard/profile/password">
            <button className="btn btn-accent btn-md text-sm">
              Change Password
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
