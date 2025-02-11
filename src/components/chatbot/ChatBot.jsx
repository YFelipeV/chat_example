import React, { useEffect, useRef, useState } from 'react'
import cormini from '../../assets/images/img/cormini.png'
import Frequent from './components/Frequent';
import Message from './components/Message';

export const  ChatBot=()=> {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const chatContainerRef = useRef(null);



    useEffect(() => {
        loadChatHistory();
    }, []);

    const loadChatHistory = async () => {
        try {
            const result = await getChatHistory();
            if (result.STATUS) {
                const formattedMessages = result.RSP.map(msg => ({
                    id: msg.id,
                    text: msg.message,
                    isUser: msg.role === 'user',
                    status: "sent",
                    timestamp: new Date(msg.created_at)
                }));
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error("Error cargando historial:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            const { scrollHeight } = chatContainerRef.current;
            chatContainerRef.current.scrollTo({
                top: scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const sendMessage = async (message = inputMessage) => {
        if (message.trim() === "") return;

        const newMessage = {
            id: Date.now().toString(),
            text: message,
            isUser: true,
            status: "sent",
            timestamp: new Date()
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
        setIsTyping(true);

        try {
            const result = await sendMessageApi({ message: message });
            if (result.STATUS) {
                const botResponse = {
                    id: (Date.now() + 1).toString(),
                    text: result.RSP,
                    isUser: false,
                    status: "sent",
                    timestamp: new Date()
                };
                setMessages((prevMessages) => [...prevMessages, botResponse]);
            } else {
                setInputMessage(message)
                const botResponse = {
                    id: (Date.now() + 1).toString(),
                    text: '<p>Error, Intenta nuevamente</p>',
                    isUser: false,
                    status: "sent",
                    timestamp: new Date()
                };
                setMessages((prevMessages) => [...prevMessages, botResponse]);
            }
        } catch (error) {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, status: "error" } : msg
                )
            );
        } finally {
            setIsTyping(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const handleQuestionClick = (question) => {
        sendMessage(question);
    };
    return (
        <div className="chat-boot-container">
        <div className="chat-header">
            <div>
                <img src={cormini} className="icon-header" alt="Logo Corbot" />
            </div>
            <div>
                <span className="title-header">Cor-IA</span>
            </div>
        </div>
        <div
            ref={chatContainerRef}
            className="messages-container"
        >
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <span className="loading-text">Cargando mensajes</span>
                </div>
            ) : (
                <>
                    {messages.length === 0 && (
                        <Frequent onQuestionClick={handleQuestionClick} />
                    )}
                    {messages.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                    {isTyping && (
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}
                </>
            )}
        </div>
        <form onSubmit={handleSubmit} className="message-input">
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={isTyping || isLoading}
                className="message-input-field"
            />
            <button
                type="submit"
                className="send-button"
                disabled={isTyping || isLoading || inputMessage.trim() === ""}
            >
                <i className="ri-send-plane-fill"></i>
            </button>
        </form>
    </div>
    )
}
