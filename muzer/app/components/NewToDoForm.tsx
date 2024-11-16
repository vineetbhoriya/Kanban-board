"use client";
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
import { createTask, getUsers } from "../util/User";

interface NewToDoFormProps {
  open: boolean;
  onClose: () => void;
}

const NewToDoForm = ({ open, onClose }: NewToDoFormProps) => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    // Fetch users when the component is mounted
    const fetchUsers = async () => {
      const users = await getUsers(); // Use the imported function
      setUsers(users);
    };

    fetchUsers();
  }, []);

  const handleSave = async () => {
    if (newItemTitle.trim() && selectedUser) {
      const taskData = {
        title: newItemTitle,
        description: newDescription,
        priority: newPriority,
        assigned_User: selectedUser,
      };

      const createdTask = await createTask(taskData);
      window.location.reload();
      if (createdTask) {
        setNewItemTitle("");
        setNewDescription("");
        setNewPriority("");
        setSelectedUser("");
      }
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New To-Do Item</DialogTitle>
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

        {/* Select User */}
        <FormControl fullWidth margin="dense">
          <InputLabel>User</InputLabel>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            label="User"
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
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

export default NewToDoForm;
