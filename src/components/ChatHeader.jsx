import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  // Get the logged-in user (authUser) and selectedUser from the store
  const { authUser } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();

  // Check if the logged-in user exists
  const loggedInUserName = authUser ? authUser.fullName : "Guest"; // Display 'Guest' if no user is logged in

  // Ensure selectedUser is not null and has the necessary data
  const selectedUserName = selectedUser ? selectedUser.fullName : "No user selected";

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.profilePic || "/avatar.png"} // Use default avatar if no profilePic
                alt={selectedUser?.fullName || "No name"} // Display selectedUser's name if available
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{loggedInUserName}</h3> {/* Show the logged-in user's name */}
            <p className="text-sm text-base-content/70">
              {selectedUser ? "Chatting with " + selectedUserName : "Select a user to chat"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
