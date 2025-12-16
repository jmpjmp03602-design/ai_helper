import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, FileText, X, Zap, Shield, Briefcase, Paperclip } from './ui/Icons';
import { sendMessageStream } from '../services/geminiService';
import { Message, Attachment } from '../types';
import { GenerateContentResponse } from '@google/genai';

interface ChatInterfaceProps {
  onClose?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: '안녕하세요! JobPilot AI 커리어 코치입니다. \n이력서 첨삭, 면접 준비, 혹은 급한 커리어 상담이 필요하신가요? \nPDF 이력서를 업로드하시면 바로 분석해드립니다.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<Attachment | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SUGGESTIONS = [
    { text: "이력서 요약이 너무 평범해, 수정해줘", icon: <FileText size={14} />, label: "이력서 맛보기" },
    { text: "마케터 직군 면접 질문 뽑아줘", icon: <Briefcase size={14} />, label: "직무별 질문" },
    { text: "내일 당장 면접인데 뭘 준비해?", icon: <Zap size={14} />, label: "긴급 면접 대비" },
    { text: "내 이력서 정보는 안전해?", icon: <Shield size={14} />, label: "보안 문의" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('PDF 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachedFile({
        name: file.name,
        type: file.type,
        data: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
    
    // Reset input value to allow selecting the same file again if needed
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
  };

  const handleSendMessage = async (text: string) => {
    if ((!text.trim() && !attachedFile) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      attachment: attachedFile ? { ...attachedFile } : undefined
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setAttachedFile(null);
    setIsLoading(true);

    try {
      const stream = await sendMessageStream(userMessage.content, userMessage.attachment);
      
      const botMessageId = (Date.now() + 1).toString();
      let accumulatedText = "";

      // Add placeholder message
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          role: 'model',
          content: '',
          timestamp: new Date(),
          isStreaming: true
        },
      ]);

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        const text = c.text || "";
        accumulatedText += text;

        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMessageId 
              ? { ...msg, content: accumulatedText }
              : msg
          )
        );
      }

      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMessageId 
            ? { ...msg, isStreaming: false }
            : msg
        )
      );

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          content: '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-primary-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm md:text-base">JobPilot Career Agent</h3>
            <p className="text-xs text-primary-100 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}
            >
              {msg.attachment && (
                <div className={`flex items-center space-x-2 mb-3 p-2 rounded-lg ${
                  msg.role === 'user' ? 'bg-white/20' : 'bg-slate-100'
                }`}>
                  <FileText size={18} />
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium truncate max-w-[150px]">{msg.attachment.name}</p>
                    <p className="text-[10px] opacity-80">PDF Document</p>
                  </div>
                </div>
              )}
              <div className="prose prose-sm max-w-none break-words whitespace-pre-wrap">
                {msg.content}
              </div>
              {msg.isStreaming && (
                 <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse align-middle">|</span>
              )}
            </div>
          </div>
        ))}
        
        {/* Suggestion Chips - Only show when messages count is low (e.g. initial state) */}
        {messages.length < 3 && !isLoading && (
          <div className="grid grid-cols-1 gap-2 mt-4 px-1">
            <p className="text-xs text-slate-400 mb-1 ml-1 font-medium">빠른 시작:</p>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTIONS.map((s, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSendMessage(s.text)}
                  className="flex items-center space-x-2 p-2.5 text-xs text-left bg-white border border-slate-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition shadow-sm"
                >
                  <span className="text-primary-500">{s.icon}</span>
                  <span className="font-medium truncate">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-200">
        {/* Attached File Preview */}
        {attachedFile && (
          <div className="mb-3 flex items-center justify-between p-2 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in-up">
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="p-1.5 bg-white rounded-md border border-primary-100">
                <FileText size={16} className="text-primary-600" />
              </div>
              <span className="text-sm text-primary-900 font-medium truncate max-w-[200px]">{attachedFile.name}</span>
            </div>
            <button 
              type="button" 
              onClick={handleRemoveFile}
              className="p-1 hover:bg-primary-100 rounded-full text-primary-500 transition"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="relative flex items-end space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 hover:text-slate-700 transition mb-[1px]"
            title="PDF 업로드"
          >
            <Paperclip size={20} />
          </button>
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="질문하거나 PDF 이력서를 업로드하세요..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition shadow-sm resize-none min-h-[46px] max-h-32"
              rows={1}
              style={{ minHeight: '46px' }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !attachedFile)}
              className="absolute right-2 bottom-2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
        <div className="text-center mt-2">
            <p className="text-xs text-slate-400">AI는 실수를 할 수 있습니다. 중요한 정보는 확인이 필요합니다.</p>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;