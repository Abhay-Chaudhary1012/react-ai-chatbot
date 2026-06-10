import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Chat } from "./components/Chat/Chat";
import { Assistant } from "./components/Assistant/Assistant";
import { Theme } from "./components/Theme/Theme";
import styles from "./App.module.css";

function App() {
  const [assistant, setAssistant] = useState();

  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("dsa-buddy-chats");
    return savedChats ? JSON.parse(savedChats) : [];
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    return localStorage.getItem("dsa-buddy-active-chat");
  });

  const activeChatMessages = useMemo(
    () => chats.find(({ id }) => id === activeChatId)?.messages ?? [],
    [chats, activeChatId]
  );

  useEffect(() => {
    if (chats.length === 0) {
      handleNewChatCreate();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "dsa-buddy-chats",
      JSON.stringify(chats)
    );
  }, [chats]);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem(
        "dsa-buddy-active-chat",
        activeChatId
      );
    }
  }, [activeChatId]);

  function handleAssistantChange(newAssistant) {
    setAssistant(newAssistant);
  }

  function handleChatMessagesUpdate(id, messages) {
    const title = messages[0]?.content
      ?.split(" ")
      .slice(0, 7)
      .join(" ");

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              title: chat.title ?? title,
              messages,
            }
          : chat
      )
    );
  }

  function handleNewChatCreate() {
    const id = uuidv4();

    setActiveChatId(id);

    setChats((prevChats) => [
      ...prevChats,
      {
        id,
        messages: [],
      },
    ]);
  }

  function handleActiveChatIdChange(id) {
    setActiveChatId(id);

    setChats((prevChats) =>
      prevChats.filter(
        ({ messages }) => messages.length > 0
      )
    );
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img
          className={styles.Logo}
          src="/chat-bot.png"
          alt="DSA Buddy AI"
        />

        <h2 className={styles.Title}>
          DSA Buddy AI
        </h2>
      </header>

      <div className={styles.Content}>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          activeChatMessages={activeChatMessages}
          onActiveChatIdChange={handleActiveChatIdChange}
          onNewChatCreate={handleNewChatCreate}
        />

        <main className={styles.Main}>
          {chats.map((chat) => (
            <Chat
              key={chat.id}
              assistant={assistant}
              isActive={chat.id === activeChatId}
              chatId={chat.id}
              chatMessages={chat.messages}
              onChatMessagesUpdate={
                handleChatMessagesUpdate
              }
            />
          ))}

          <div className={styles.Configuration}>
            <Assistant
              onAssistantChange={
                handleAssistantChange
              }
            />
            <Theme />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;