import { useState, useRef, useEffect } from 'react';
import { Search, Pencil, MoreHorizontal, Video, Phone, Smile, Paperclip, Image, Send } from 'lucide-react';
import Avatar from '../components/Avatar';
import { conversations } from '../data/messages';

function Messaging() {
  const [activeId, setActiveId] = useState(conversations[0]?.id || null);
  const [messageText, setMessageText] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeConvo = conversations.find(c => c.id === activeId);

  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId]);

  // Show "pecking" indicator briefly when switching conversations
  useEffect(() => {
    if (!activeConvo) return;
    setTyping(true);
    const timer = setTimeout(() => setTyping(false), 2500);
    return () => clearTimeout(timer);
  }, [activeId]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    // In a real app we'd add the message to state; for the hackathon we just clear
    setMessageText('');
  };

  const getInitials = (name) => {
    const parts = (name || '').split(' ').filter(Boolean);
    return parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : (parts[0] || 'P')[0];
  };

  return (
    <div className="bg-li-card rounded-lg border border-li-border overflow-hidden flex"
         style={{ height: 'calc(100vh - 68px)' }}>
      {/* ===== LEFT PANEL: Conversation List ===== */}
      <div className="w-80 border-r border-li-border flex flex-col shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h2 className="text-lg font-semibold text-li-text">Messaging</h2>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-li-secondary transition-colors">
              <Pencil size={18} />
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-li-secondary transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-li-secondary" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full h-[34px] rounded-[4px] border-none bg-[#eef3f8] py-1.5 pl-9 pr-3 text-[14px] text-li-text placeholder-li-secondary/80 outline-none focus:shadow-[0_0_0_2px_#0a66c2]"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setActiveId(convo.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-none outline-none ${
                convo.id === activeId
                  ? 'bg-li-blue-light'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar name={convo.withName} color={convo.withColor} size="sm" />
                {convo.unread && (
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-li-blue rounded-full border-2 border-white" />
                )}
              </div>

              {/* Name + Preview */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[14px] truncate ${convo.unread ? 'font-semibold text-li-text' : 'font-normal text-li-text'}`}>
                    {convo.withName}
                  </span>
                </div>
                <p className={`text-[12px] truncate mt-0.5 ${convo.unread ? 'text-li-text font-medium' : 'text-li-secondary'}`}>
                  {convo.lastMessage}
                </p>
              </div>

              {/* Time */}
              <span className="text-[11px] text-li-secondary whitespace-nowrap shrink-0 self-start mt-1">
                {convo.messages[convo.messages.length - 1]?.time}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ===== RIGHT PANEL: Chat Area ===== */}
      {activeConvo ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-li-border">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar name={activeConvo.withName} color={activeConvo.withColor} size="sm" />
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-li-text truncate">{activeConvo.withName}</h3>
                <p className="text-[12px] text-li-secondary truncate">{activeConvo.withHeadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className="p-2 rounded-full hover:bg-gray-100 text-li-secondary transition-colors">
                <Video size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-li-secondary transition-colors">
                <Phone size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-li-secondary transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {activeConvo.messages.map((msg, idx) => {
              const isMe = msg.from === 'me';
              return (
                <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[70%] ${isMe ? 'flex-row-reverse' : ''}`}>
                    {!isMe && (
                      <div className="shrink-0 mb-4">
                        <Avatar name={activeConvo.withName} color={activeConvo.withColor} size="sm" />
                      </div>
                    )}
                    <div>
                      <div
                        className={`px-3 py-2 rounded-xl text-[14px] leading-relaxed ${
                          isMe
                            ? 'bg-li-blue text-white rounded-br-sm'
                            : 'bg-[#f2f2f2] text-li-text rounded-bl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p className={`text-[11px] text-li-secondary mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {typing && (
              <div className="flex items-center gap-2">
                <div className="shrink-0">
                  <Avatar name={activeConvo.withName} color={activeConvo.withColor} size="sm" />
                </div>
                <div className="bg-[#f2f2f2] px-4 py-2.5 rounded-xl rounded-bl-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-li-secondary italic">
                      {activeConvo.withName.split(' ')[0]} is pecking
                    </span>
                    <span className="flex gap-0.5 ml-0.5">
                      <span className="w-1.5 h-1.5 bg-li-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-li-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-li-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Bar */}
          <div className="border-t border-li-border px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Write a coo..."
                className="flex-1 h-[40px] rounded-full border border-li-border bg-white px-4 text-[14px] text-li-text placeholder-li-secondary/70 outline-none focus:border-li-blue focus:shadow-[0_0_0_1px_#0a66c2] transition-all"
              />
              <button className="p-2 rounded-full hover:bg-gray-100 text-li-secondary transition-colors">
                <Smile size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-li-secondary transition-colors">
                <Paperclip size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-li-secondary transition-colors">
                <Image size={20} />
              </button>
              <button
                onClick={handleSend}
                disabled={!messageText.trim()}
                className={`p-2 rounded-full transition-colors ${
                  messageText.trim()
                    ? 'bg-li-blue text-white hover:bg-li-blue-hover'
                    : 'text-li-secondary/40 cursor-not-allowed'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty state when no conversation selected */
        <div className="flex-1 flex items-center justify-center text-li-secondary">
          <div className="text-center">
            <p className="text-[48px] mb-2">🐦</p>
            <p className="text-lg">Select a conversation to start cooing</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messaging;
