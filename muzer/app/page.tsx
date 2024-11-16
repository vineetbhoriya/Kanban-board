"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ToDoItem, ToDoItems } from "./components/Types";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import KanbanColumn from "./components/KanbanColumn";
import { createUser, getTodos } from "./util/User";

// Initial state with empty arrays for tasks categorized by their status
const initialToDoItems: ToDoItems = {
  todo: [],
  inProgress: [],
  done: [],
};

export default function Home() {
  const { data: session } = useSession();
  const [userCreated, setUserCreated] = useState(false);
  const [toDoItems, setToDoItems] = useState<ToDoItems>(initialToDoItems);

  // Function to create a user and fetch to-dos
  const handleUserCreation = async () => {
    if (session?.user) {
      const { name, email } = session.user;

      // Create the user if not created already
      if (!userCreated && name && email) {
        const createdUser = await createUser({ name, email });
        if (createdUser) {
          setUserCreated(true);
        }
        const todos = await getTodos();
        setToDoItems(todos);
      }
    }
  };

  useEffect(() => {
    if (session) {
      handleUserCreation();
    }
  }, [session, userCreated]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {session && (
        <>
          <main className="flex flex-1 flex-col items-center justify-center p-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 sm:px-10 md:px-22 max-w-screen-lg">
              <div className="min-w-0">
                <KanbanColumn title="Todo" toDoItems={toDoItems.todo} />
              </div>

              <div className="min-w-0">
                <KanbanColumn
                  title="In Progress"
                  toDoItems={toDoItems.inProgress}
                />
              </div>

              <div className="min-w-0">
                <KanbanColumn title="Done" toDoItems={toDoItems.done} />
              </div>
            </div>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
