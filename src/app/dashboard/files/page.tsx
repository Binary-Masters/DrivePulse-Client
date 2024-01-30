import MoreDropDrown from "@/Components/Dashboard/Files/More";
import Link from "next/link";
import { MdArrowDropDownCircle, MdDelete } from "react-icons/md";
import changePassword from "./../changePassword";

const Files = () => {
  return (
    <div className="mt-20 ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Owner</th>
              <th className="px-6 py-3">Modified</th>
              <th className="px-6 py-3">File size</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">More</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                1
              </th>
              <th className="px-6 py-4 ">4.png</th>
              <td className="px-6 py-4">BinaryMasters</td>
              <td className="px-6 py-4">02 feb 2024</td>
              <td className="px-6 py-4">404kb</td>
              <td className="px-6 py-4">
                <Link
                  href="#"
                  className="font-medium text-3xl text-red-600 dark:text-red-500 hover:font-bold"
                >
                  <MdDelete />
                </Link>
              </td>
              <td className="px-6 py-4">
                <Link href="#" className="text-2xl">
                  <MoreDropDrown></MoreDropDrown>
                </Link>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                1
              </th>
              <th className="px-6 py-4 ">4.png</th>
              <td className="px-6 py-4">BinaryMasters</td>
              <td className="px-6 py-4">02 feb 2024</td>
              <td className="px-6 py-4">404kb</td>
              <td className="px-6 py-4">
                <Link
                  href="#"
                  className="font-medium text-3xl text-red-600 dark:text-red-500 hover:font-bold"
                >
                  <MdDelete />
                </Link>
              </td>
              <td className="px-6 py-4">
                <Link href="#" className="text-2xl">
                  <MoreDropDrown></MoreDropDrown>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <changePassword />
    </div>
  );
};

export default Files;
