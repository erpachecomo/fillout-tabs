import "./Tab.css";

import Image, { ImageProps } from "next/image";

type TabProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  selected?: boolean;
  className?: string;
  icon?: string;
  iconProps?: Partial<ImageProps>;
  id?: string
};

const Tab: React.FC<TabProps> = (props) => {
  return (
    <button
      id={props.id}
      className={`
        ${
          props.selected
            ? "bg-white text-gray-900 border-ft-gray-200 border-[0.5] shadow-[0px_1px_3px_0px_#0000000A,0px_1px_1px_0px_#00000005] focus:border-ft-blue-500 focus:shadow-[0px_0px_0px_1.5px_#2F72E240]"
            : "bg-ft-gray-100 text-gray-600 hover:bg-ft-gray-150"
        }
        flex items-center flex-shrink-0
        text-sm font-medium 
        group overflow-visible cursor-pointer
        ${props.className ? props.className : ""}
      `}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
      onDoubleClick={props.onDoubleClick}
      
    >
      {props.icon && (
        <Image
          src={props.icon}
          width={20}
          height={20}
          alt="icon"
          className={`mr-2 ${props.selected ? "tab-selected" : ""}`}
          unoptimized
          {...props.iconProps}
        />
      )}
      {props.children}

     
    </button>
  );
};

export default Tab;
