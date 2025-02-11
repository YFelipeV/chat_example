import React from 'react'
import {ChatBot} from './components/chatbot/ChatBot'

export default function ChatWidget() {
    return (
        <div>
            <div className='chat-toogle-content'>
                <ChatBot />
            </div>
        </div>
    )
}
