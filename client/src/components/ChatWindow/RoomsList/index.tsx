import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { ChatRoom } from "../../../types/room";

export default function UserList() {
  const roomName = useLoaderData() as string;
  const [visibleTab, setVisibleTab] = useState(0);
  const [rooms, setRooms] = useState<{ user: ChatRoom[]; global: ChatRoom[] }>({
    user: [],
    global: [],
  });

  useEffect(() => {
    fetch("http://localhost:9000/rooms", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ userRooms, globalRooms }) => {
        setRooms({
          user: userRooms,
          global: globalRooms,
        });
      });
  }, []);

  return (
    <>
      <aside className="[grid-area:users] flex flex-col mt-2">
        <section className="tabs flex flex-col grow overflow-hidden pt-[2px]">
          <menu role="tablist" aria-label="Sample Tabs">
            <button
              onClick={() => setVisibleTab(0)}
              role="tab"
              aria-selected={visibleTab === 0}
              aria-controls="tab-A">
              Rooms
            </button>
            <button
              aria-selected={visibleTab === 1}
              onClick={() => setVisibleTab(1)}
              role="tab"
              aria-controls="tab-B">
              Users
            </button>
          </menu>
          <article
            role="tabpanel"
            id="tab-A"
            className={`grow p-0 overflow-hidden flex-col ${visibleTab === 0 ? "flex" : "hidden"}`}>
            <ul className="tree-view">
              <li>
                <details open>
                  <summary>Global ({rooms.global.length})</summary>
                  <ul>
                    {rooms.global.map((room) => (
                      <li className={roomName === room.name ? "font-bold" : ""} key={room.id}>
                        {room.name}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Your rooms ({rooms.user.length})</summary>
                  <ul>
                    {rooms.user.map((room) => (
                      <li key={room.id}>
                        <Link to={`/chat?room=${room.name}`}>{room.name}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </article>
          <article
            role="tabpanel"
            id="tab-B"
            className={`grow p-0 overflow-hidden flex-col ${visibleTab === 1 ? "flex" : "hidden"}`}>
            <p className="px-2 m-0 mt-2 text-center">
              Members of <strong>{roomName}</strong>
            </p>
            <hr className="mb-0" />
            <ul className="h-full m-0 p-0 list-none overflow-auto">
              <li className="px-2 py-1 hover:bg-slate-200">userdata</li>
            </ul>
          </article>
        </section>
        <footer className="py-1 mb-2">
          <a className="boxed-link" href="/create-room">
            Create room
          </a>
        </footer>
      </aside>
    </>
  );
}