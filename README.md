# 🚀 DSA Buddy AI

## 🌐 Live Demo

https://react-ai-chatbot-git-main-abhay-chaudharys-projects-2e26b5fb.vercel.app/

---

## 📖 About The Project

DSA Buddy AI is an AI-powered learning assistant designed to help students learn Data Structures and Algorithms in a structured and interview-oriented way.

The application provides detailed explanations, complexity analysis, roadmap guidance, mock interview support, and LeetCode assistance using the Groq-hosted Llama 3.3 70B model.

---

## 🌟 Features

### 🤖 AI-Powered DSA Mentor

* Structured DSA explanations
* Brute Force → Better → Optimal approach
* Time Complexity analysis
* Space Complexity analysis
* Interview-focused guidance

### 💬 Multi Chat Support

* Create multiple conversations
* Switch between chats
* Delete chats
* Persistent chat history using Local Storage

### 📚 Quick DSA Actions

* DSA Roadmap
* LeetCode Help
* Mock Interview
* Explain Any Topic

### 📄 Export Functionality

* Export Chat as TXT
* Export Chat as PDF

### 📋 Productivity Features

* Copy AI Responses
* Markdown Rendering
* Streaming Responses

### 🎨 UI Features

* Responsive Design
* Dark / Light Theme Support
* Mobile Friendly Interface

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* CSS Modules

### AI Integration

* Groq API
* Llama 3.3 70B Versatile

### Libraries

* jsPDF
* UUID
* React Markdown
* React Textarea Autosize

### Deployment

* Vercel

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Abhay-Chaudhary1012/react-ai-chatbot
```

Navigate to the project directory:

```bash
cd react-ai-chatbot
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
VITE_OPEN_AI_API_KEY=your_groq_api_key
```

> Note: The variable name is `VITE_OPEN_AI_API_KEY`, but the project uses Groq's OpenAI-compatible API endpoint.

Run the application:

```bash
npm run dev
```

---

## 🚀 Deployment

Build the project:

```bash
npm run build
```

Deploy using:

* Vercel
* Netlify
* Any Static Hosting Provider

---

## 🏗️ Project Architecture

```text
src
│
├── assistants
│   ├── openai.js
│   ├── deepseekai.js
│   ├── anthropicai.js
│   ├── googleai.js
│   └── xai.js
│
├── components
│   ├── Assistant
│   ├── Chat
│   ├── Controls
│   ├── Loader
│   ├── Messages
│   ├── Sidebar
│   └── Theme
│
├── App.jsx
└── main.jsx
```

---

## 🎯 Future Improvements

* User Authentication
* Cloud Database Storage
* Chat Search Functionality
* Shared Conversation Links
* Voice-Based Interaction
* Chat Categories and Tags

---

## 👨‍💻 Author

**Abhay Chaudhary**

Final Year B.Tech Student | Java | Spring Boot | React | DSA

---

## ⭐ Project Highlights

* AI-Powered Learning Assistant
* Prompt Engineered DSA Mentor
* Multi-Chat Architecture
* PDF/TXT Export System
* Local Storage Persistence
* Responsive Modern UI
* Production Deployment on Vercel
* Groq Llama 3.3 70B Integration

---

If you found this project useful, consider giving it a ⭐ on GitHub.
