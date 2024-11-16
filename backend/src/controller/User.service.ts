import User, { UserDoc } from "../model/User";

export const createUser = async (
  name: string,
  email: string,
  role: string = "user"
): Promise<UserDoc | string> => {
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return "User with this email already exists";
    } else {
      const user = new User({
        name,
        email,
        role,
      });

      await user.save();
      return "User created successfully";
    }
  } catch (error: any) {
    return `Error creating user. Please try again later.${error.message}`;
  }
};
// get user by id
export const getUserById = async (
  userId: string
): Promise<UserDoc | null | string> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return "User not found";
    }
    return user;
  } catch (error) {
    console.error("Error retrieving user by ID: ", error);
    return "Error retrieving user. Please try again later.";
  }
};

export const getUsersByRole = async (
  role: string
): Promise<UserDoc[] | string> => {
  try {
    const users = await User.find({ role });
    if (users.length === 0) {
      return "No users found with this role";
    }
    return users;
  } catch (error) {
    console.error("Error retrieving users by role: ", error);
    return "Error retrieving users. Please try again later.";
  }
};

export const getAllUsers = async (): Promise<UserDoc[] | string> => {
  try {
    const users = await User.find().select("name");
    if (users.length === 0) {
      return "No users found";
    }
    return users;
  } catch (error) {
    console.error("Error retrieving all users: ", error);
    return "Error retrieving users. Please try again later.";
  }
};

export const updateUserById = async (
  userId: string,
  updatedData: Partial<UserDoc>
): Promise<UserDoc | string> => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      return "User not found for update";
    }
    return user;
  } catch (error) {
    console.error("Error updating user: ", error);
    return "Error updating user. Please try again later.";
  }
};

export const deleteUserById = async (userId: string): Promise<string> => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return "User not found for deletion";
    }
    return "User successfully deleted";
  } catch (error) {
    console.error("Error deleting user: ", error);
    return "Error deleting user. Please try again later.";
  }
};
