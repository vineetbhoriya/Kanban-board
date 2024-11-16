"use client";
import ToDoCard from "./ToDoCard";
import { ToDoItem } from "./Types";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewToDoForm from "./NewToDoForm";

interface KanbanColumnProps {
  title: string;
  toDoItems: ToDoItem[];
}

const KanbanColumn = ({ title, toDoItems }: KanbanColumnProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true); 
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="border rounded-lg p-4 h-[500px] overflow-hidden flex flex-col shadow-lg bg-[#F5F5F5]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 gap-1">
          <p
            className={`w-2.5 h-2.5 ${getDotColor(title)} mb-1 rounded-full`}
          ></p>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="bg-gray-300 text-xs rounded-full py-1 px-2">
            {toDoItems.length}
          </p>
        </div>
        {title === "Todo" && (
          <IconButton onClick={handleOpenDialog} className="cursor-pointer">
            <AddIcon />
          </IconButton>
        )}
      </div>

      <div className={`w-full mb-4 ${getBorderColor(title)} border-b-2`}></div>

      <div className="flex-1 overflow-y-auto">
        {toDoItems.map((item) => (
          <ToDoCard key={item.id} item={item} />
        ))}
      </div>

      <NewToDoForm open={openDialog} onClose={handleCloseDialog} />
    </div>
  );
};

const getDotColor = (title: string) => {
  if (title === "Todo") return "bg-violet-900";
  if (title === "In Progress") return "bg-orange-600";
  if (title === "Done") return "bg-green-600";
  return "bg-gray-500";
};

const getBorderColor = (title: string) => {
  if (title === "Todo") return "border-violet-900";
  if (title === "In Progress") return "border-orange-600";
  if (title === "Done") return "border-green-600";
  return "border-gray-500";
};

export default KanbanColumn;
