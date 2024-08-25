import { useCallback, useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ChatInput from "~/components/ChatWindow/ChatInput";
import MessagesList from "~/components/ChatWindow/MessagesList";
import UserList from "~/components/ChatWindow/RoomsList";
import useBeacon from "~/hooks/useBeacon";
import { useDraggable } from "~/hooks/useDraggable";
import { ChatLoaderType } from "~/routes/chat";
import styles from "./styles.module.css";
import usePresence from "~/components/ChatWindow/useUserCount";
import XPWindow from "~/components/XPWindow";

export default function ChatWindow() {
  const navigate = useNavigate();
  const elRef = useRef<HTMLDivElement | null>(null);
  const { room } = useLoaderData() as ChatLoaderType;
  const { x, y } = useDraggable(elRef);
  const sendLogout = useBeacon();
  const onlineUsers = usePresence(room);

  useEffect(() => {
    if (!elRef.current) return;
    elRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, [x, y]);

  // const logout = useCallback(async () => {
  //   sendLogout();
  //   await fetch("/api/auth/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   });

  //   navigate("/", { replace: true });
  // }, []);

  const StatusBar = () => (
    <>
      <p className="status-bar-field px-2">Current channel: {room}</p>
      <p className="status-bar-field pr-2">{onlineUsers?.length} member(s) online</p>
      <p className="status-bar-field pr-2">CPU Usage: 14%</p>
    </>
  );

  // YAH: Fix the styles from here and XPWindow component
  return (
    <XPWindow title="React Chat | XP Edition" statusBar={<StatusBar />}>
      <MessagesList />
      <ChatInput />
      <UserList users={onlineUsers} />
    </XPWindow>
  );

  // return (
  //   <div className={`window ${styles.windowContainer}`} ref={(el) => (elRef.current = el)}>
  //     <div className="title-bar">
  //       <div className="title-bar-text">React Chat | XP Edition</div>
  //       <div className="title-bar-controls">
  //         <button aria-label="Help" onClick={() => alert("todo")}></button>
  //         <button aria-label="Close" onClick={logout}></button>
  //       </div>
  //     </div>

  //     <div className="status-bar mx-0">
  //       <div className="flex">
  //         <p className="status-bar-field px-2">Current channel: {room}</p>
  //         <p className="status-bar-field pr-2">{onlineUsers?.length} member(s) online</p>
  //         <p className="status-bar-field pr-2">CPU Usage: 14%</p>
  //       </div>
  //     </div>
  //   </div>
  // );
}
