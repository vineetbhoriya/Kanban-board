// components/NavBar.tsx
import { Button } from "@mui/material";
import { useSession, signOut, signIn } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center p-4 bg-white shadow-md">
      <button className="text-2xl font-bold text-blue-600">Kanban board</button>
      <div className="ml-auto flex space-x-4">
        {session ? (
          <Button
            onClick={() => signOut()}
            variant="contained"
            color="primary"
          >
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => signIn()} variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
