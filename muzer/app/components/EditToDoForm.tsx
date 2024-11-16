import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { updateTodo, getUsers } from "../util/User";
import { ToDoItem } from "./Types";

interface EditToDoFormProps {
  open: boolean;
  onClose: () => void;
  setShowMenu: any;
  item: ToDoItem | null; // Accept item as prop
}

const EditToDoForm = ({
  open,
  onClose,
  item,
  setShowMenu,
}: EditToDoFormProps) => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState("");

  useEffect(() => {
    if (item) {
      // Populate the form with the existing item data if available
      setNewItemTitle(item.title);
      setNewDescription(item.description);
      setNewPriority(item.priority);
    }
  }, [item]);

  const handleSave = async () => {
    if (item) {
      const taskData = {
        id: item.id,
        title: newItemTitle,
        description: newDescription,
        priority: newPriority,
      };

      // If item exists, update the task, otherwise create a new task
      const updatedTask = await updateTodo(taskData);
      window.location.reload();
      if (updatedTask) {
        setNewItemTitle("");
        setNewDescription("");
        setNewPriority("");
        window.location.reload();
      }
    }
    onClose();
    setShowMenu(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit To-Do Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="outlined"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          variant="outlined"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Priority</InputLabel>
          <Select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditToDoForm;
