"use client";

import React, { useRef, useState } from "react";

import CheckIcon from "../assets/icons/check.svg";
import DocumentIcon from "../assets/icons/doc.svg";
import Image from "next/image";
import InfoIcon from "../assets/icons/info.svg";
import MenuIcon from "../assets/icons/menu.svg";
import PlusIcon from "../assets/icons/plus.svg";
import Tab from "./Tab";
import TabMenu from "./TabMenu";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

type Item = {
  id: number;
  label: string;
  icon: string;
  type: PageType;
};

// Fillout page types
enum PageType {
  "Form",
  "Cover",
  "Ending",
  // ... ignoring others for simplicity
}
const tabList: Item[] = [
  { id: 1, label: "Info", icon: InfoIcon, type: PageType.Cover },
  { id: 2, label: "Details", icon: DocumentIcon, type: PageType.Form },
  { id: 3, label: "Other", icon: DocumentIcon, type: PageType.Form },
  { id: 4, label: "Ending", icon: CheckIcon, type: PageType.Ending },
];

const Tabs: React.FC = () => {
  const lastId = useRef(tabList.length);
  const [showMenuForId, setShowMenuForId] = useState(-1);
  const [selectedTab, setSelectedTab] = useState(tabList[0].id);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [tabLabel, setTabLabel] = useState("");

  const [parent, tabs, setTabs] = useDragAndDrop<HTMLDivElement, Item>(
    tabList,
    {
      draggable: (el) => {
        return (
          // @ts-expect-error data-type is added to all draggable elements
          el["data-type"] !== PageType.Cover &&
          // @ts-expect-error data-type is added to all draggable elements
          el["data-type"] !== PageType.Ending
        );
      },
    }
  );

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabLabel(event.target.value);
  };

  const saveTabText = (index: number) => {
    setEditingIndex(-1);
    setTabs((ts) => {
      ts[index] = { ...ts[index], label: tabLabel };
      return ts;
    });
  };

  const handleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        saveTabText(index);
      }
    };
  const handleDoubleClick = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setEditingIndex(index);
    setTabLabel(tabs[index].label);
  };
  const handleMenuClick = (id: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === showMenuForId) {
      setShowMenuForId(-1);
    } else {
      setShowMenuForId(id);
    }
  };

  const handleNewTabClick = (indexToAddTab: number) => () => {
    setTabs((ts) => {
      lastId.current++;
      return ts.toSpliced(indexToAddTab, 0, {
        label: "New",
        icon: DocumentIcon,
        id: lastId.current,
        type: PageType.Form,
      });
    });
    setEditingIndex(indexToAddTab);
    setTabLabel("New");
  };

  return (
    <div
      ref={parent}
      className="
      items-end
      self-start
      justify-self-end
      h-[500px]
      p-4 relative inline-flex
      gap-6 z-10
      before:content-[''] before:absolute before:left-4 before:right-4 before:bottom-8 before:h-px before:bg-[repeating-linear-gradient(to_right,#AAA_0_3px,transparent_3px_6px)] before:bg-[length:100%_18px] before:bg-no-repeat before:-translate-y-1/2"
    >
      {tabs.map((item, index) => (
        <div
          className="relative inline-flex items-center group"
          key={item.id}
          data-type={item.type}
        >
          {showMenuForId === item.id && <TabMenu key={"tab-menu"} />}

          {index > 0 && (
            <Tab
              onClick={handleNewTabClick(index)}
              iconProps={{
                className: "w-2 h-2 self-center",
              }}
              icon={PlusIcon}
              className="bg-white rounded-full h-4 w-4 justify-center border-[0.5] group-hover:flex text-xs font-medium hidden mr-6"
            ></Tab>
          )}

          <Tab
            onClick={() => {
              setSelectedTab(item.id);
            }}
            onContextMenu={handleMenuClick(item.id)}
            onDoubleClick={handleDoubleClick(index)}
            selected={selectedTab === item.id}
            icon={item.icon}
            id={"tab-" + item.id}
            className="h-8 rounded-xl px-4 py-4 "
          >
            {editingIndex === index ? (
              <input
                onBlur={() => saveTabText(index)}
                autoFocus
                type="text"
                value={tabLabel}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown(index)}
              />
            ) : (
              item.label
            )}

            <Image
              src={MenuIcon}
              width={3}
              height={2}
              alt="menu icon"
              className="ml-3 hidden transition transform -translate-x-2 ease-in-out invisible group-hover:visible group-hover:inline group-hover:translate-x-0 "
              unoptimized
              onClick={handleMenuClick(item.id)}
            />
          </Tab>
          {index < tabs.length - 1 && (
            <Tab
              onClick={handleNewTabClick(index + 1)}
              iconProps={{
                className: "w-2 h-2 self-center ",
              }}
              icon={PlusIcon}
              className="bg-white rounded-full h-4 w-4 justify-center border-[0.5] group-hover:flex text-xs font-medium hidden ml-6"
            ></Tab>
          )}
        </div>
      ))}
    </div>
  );
};
export default Tabs;
