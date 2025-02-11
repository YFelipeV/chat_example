const Message = ({ message }) => {
    return (
        <div className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
            <div className="message-content-wrapper">
                <div className="message-content" dangerouslySetInnerHTML={{ __html: message.text }}></div>
            </div>
        </div>
    );
};

export default Message;