import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { jsPDF } from "jspdf";
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

  function handleDeleteChat(chatId) {
    const updatedChats = chats.filter(
      (chat) => chat.id !== chatId
    );

    setChats(updatedChats);

    if (activeChatId === chatId) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id);
      } else {
        const newId = uuidv4();

        setActiveChatId(newId);

        setChats([
          {
            id: newId,
            messages: [],
          },
        ]);
      }
    }
  }

  function handleExportChat() {
    if (activeChatMessages.length === 0) {
      alert("No messages to export!");
      return;
    }

    const chatContent = activeChatMessages
      .map(
        (message) =>
          `${message.role.toUpperCase()}:\n${message.content}\n`
      )
      .join(
        "\n----------------------------------------\n\n"
      );

    const blob = new Blob([chatContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "dsa-buddy-chat.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleExportPDF() {
    if (activeChatMessages.length === 0) {
      alert("No messages to export!");
      return;
    }

    const doc = new jsPDF();

    const chatContent = activeChatMessages
      .map(
        (message) =>
          `${message.role.toUpperCase()}:\n${message.content}\n`
      )
      .join(
        "\n----------------------------------------\n\n"
      );

    const lines = doc.splitTextToSize(
      chatContent,
      180
    );

    doc.text(lines, 10, 10);
    doc.save("dsa-buddy-chat.pdf");
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img
          className={styles.Logo}
          src="/chat-bot.png"
          alt="DSA Buddy AI"
        />

        <div className={styles.TitleRow}>
          <h2 className={styles.Title}>
            DSA Buddy AI
          </h2>

          <div className={styles.ExportButtons}>
            <button
              className={styles.ExportButton}
              onClick={handleExportChat}
            >
              Export TXT
            </button>

            <button
              className={styles.ExportButton}
              onClick={handleExportPDF}
            >
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <div className={styles.Content}>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          activeChatMessages={activeChatMessages}
          onActiveChatIdChange={handleActiveChatIdChange}
          onNewChatCreate={handleNewChatCreate}
          onDeleteChat={handleDeleteChat}
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