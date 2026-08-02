"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Message {
  sender: "You" | "AI";
  text: string;
}

export default function ChatBox() {
  const router = useRouter();

  // Protect AI Page
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "AI",
      text: "Hello 👋 How can I help you?",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

const [image, setImage] = useState<File | null>(null);

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;

  setMessages((prev) => [
    ...prev,
    {
      sender: "You",
      text: userMessage,
    },
  ]);

  setInput("");
  setLoading(true);

  try {
  const formData = new FormData();

  formData.append("message", userMessage);

  if (image) {
    formData.append("image", image);
  }

const res = await fetch("https://agriconnect-x8no.onrender.com/ai", {
      method: "POST",
    body: formData,
  });

  const data = await res.json();
  
    if (res.ok) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: data.reply,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: data.message || "AI Error",
        },
      ]);
    }
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "AI",
        text: "Unable to connect to AI.",
      },
    ]);
  }

  setLoading(false);
};

  return (
    <div className="flex flex-col h-screen bg-white">

      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-lg font-semibold">AI Chat</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "You"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="max-w-[70%] px-4 py-2 rounded-lg border text-sm text-blue-600">
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {loading && (
  <p className="text-center text-blue-600 py-2">
    🤖 AI is thinking...
  </p>
)}

<div className="px-3 pb-2">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    }}
    className="w-full border rounded-lg p-2"
  />
</div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-5 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}