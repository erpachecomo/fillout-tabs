import CopyIcon from "../assets/icons/copy.svg";
import DuplicateIcon from "../assets/icons/duplicate.svg";
import EditIcon from "../assets/icons/edit.svg";
import FlagIcon from "../assets/icons/flag.svg";
import Image from "next/image";
import TrashIcon from "../assets/icons/trash.svg";
const TabMenu: React.FC = () => {
  return (
    <ul
      style={{ width: "240px" }}
      className="absolute bg-white text-black bottom-12 z-20 rounded-2xl border-1 border-gray-200"
    >
      <li className="p-4 font-bold bg-gray-50 rounded-t-2xl">Settings</li>
      <li className="cursor-pointer hover:bg-gray-100 px-4 py-2">
        <Image src={FlagIcon} alt="" className="inline-flex mr-2 self-center" />
        Set as first page
      </li>
      <li className="cursor-pointer hover:bg-gray-100 px-4 py-2">
        <Image src={EditIcon} alt="" className="inline-flex mr-2 self-center" />
        Rename
      </li>
      <li className="cursor-pointer hover:bg-gray-100 px-4 py-2">
        <Image src={CopyIcon} alt="" className="inline-flex mr-2 self-center" />
        Copy
      </li>
      <li className="cursor-pointer hover:bg-gray-100 px-4 py-2">
        <Image src={DuplicateIcon} alt="" className="inline-flex mr-2 self-center" />
        Duplicate
      </li>
      <hr className="mx-4 my-0 border-gray-50"/>
      <li className="cursor-pointer hover:bg-gray-100 p-4 text-red-500 rounded-b-2xl">
        <span className="">
        <Image src={TrashIcon} alt="" className="inline-flex mr-2 self-center" />
        Delete
        </span>
      </li>
    </ul>
  );
};

export default TabMenu;
