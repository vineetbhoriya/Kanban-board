import { Button } from "@mui/material";
import { deleteTodo, updateTodo, updateTodoStatus } from "../util/User";
import EditToDoForm from "./EditToDoForm";
import { ToDoItem } from "./Types";
import { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
interface ToDoCardProps {
  item: ToDoItem;
}

const ToDoCard = ({ item }: ToDoCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ToDoItem | null>(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const getPriorityStyles = () => {
    if (item.priority === "high") {
      return { bgColor: "bg-red-100", textColor: "text-red-600" };
    }
    if (item.priority === "low") {
      return { bgColor: "bg-orange-100", textColor: "text-orange-600" };
    }
    if (item.priority === "done") {
      return { bgColor: "bg-green-100", textColor: "text-green-600" };
    }
    return { bgColor: "bg-gray-100", textColor: "text-gray-600" };
  };

  const { bgColor, textColor } = getPriorityStyles();

  const deleteHandler = async () => {
    try {
      await deleteTodo(item.id);
      setShowMenu(false);
      window.location.reload();
    } catch (error) {
      setShowMenu(false);
    }
  };

  const handleOpenDialog = () => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  // handle popup menu
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  // handle Edit
  const handleEditClick = async () => {
    if (item) {
      const taskData = {
        id: item.id,
        newStatus: item.status == "Todo" ? "In Progress" : "done",
      };
      const updatedTask = await updateTodoStatus(taskData);
      window.location.reload();
      if (updatedTask) {
        window.location.reload();
      }
    }
    setSelectedItem(item);
  };

  return (
    <div
      className={`mb-4 p-4 rounded-lg shadow-md relative bg-white min-w-[250px]`}
    >
      {item.status != "done" && (
        <div
          className="absolute top-2 right-2 cursor-pointer text-gray-600"
          onClick={toggleMenu}
        >
          &#8230; {/* Ellipsis symbol for menu */}
        </div>
      )}
      {showMenu && (
        <div className="absolute top-8 right-2 bg-white border rounded-md shadow-lg p-2">
          <button
            onClick={handleOpenDialog}
            className="block w-full text-left py-1 px-2 hover:bg-gray-200"
          >
            Edit
          </button>
          <button
            onClick={deleteHandler}
            className="block w-full text-left py-1 px-2 hover:bg-gray-200"
          >
            Delete
          </button>
        </div>
      )}

      <EditToDoForm
        open={openDialog}
        onClose={handleCloseDialog}
        setShowMenu={setShowMenu}
        item={selectedItem}
      />

      <div
        className={`mb-2 ${textColor} font-semibold w-fit px-2 py-1 rounded-sm ${bgColor} text-xs`}
      >
        {item.priority}
      </div>
      <h3 className={`text-lg font-medium mb-2 capitalize`}>{item.title}</h3>
      <p className={`text-gray-600`}>{item.description}</p>
      {item.status != "done" && (
        <div onClick={handleEditClick}>
          <ArrowCircleRightIcon
            className={`absolute right-4 top-1/2 transform cursor-pointer -translate-y-1/2 ${textColor}`}
          />
        </div>
      )}
    </div>
  );
};

export default ToDoCard;
