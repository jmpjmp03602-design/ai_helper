import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import { 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Menu, 
  X,
  LogOut,
  User
} from './ui/Icons';

interface AppLayoutProps {
  onBackToHome: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ onBackToHome }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'documents' | 'interview'>('chat');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="font-bold text-xl tracking-tight">JobPilot Workspace</div>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'chat' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <MessageSquare size={20} />
            <span className="font-medium">AI Coach Chat</span>
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'documents' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">My Documents</span>
          </button>
          <button 
            onClick={() => setActiveTab('interview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'interview' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Briefcase size={20} />
            <span className="font-medium">Interview Prep</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center mb-4 space-x-3 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <div className="text-sm font-medium">Guest User</div>
              <div className="text-xs text-slate-500">Free Plan</div>
            </div>
          </div>
          <button 
            onClick={onBackToHome}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition text-sm"
          >
            <LogOut size={16} />
            <span>Exit Workspace</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <button onClick={toggleSidebar} className="text-slate-600">
            <Menu size={24} />
          </button>
          <span className="font-semibold text-slate-800">
            {activeTab === 'chat' && 'AI Coach Chat'}
            {activeTab === 'documents' && 'Documents'}
            {activeTab === 'interview' && 'Interview Prep'}
          </span>
          <div className="w-6" /> {/* Spacer for centering */}
        </header>

        <main className="flex-1 overflow-hidden p-4 md:p-6 relative">
          {activeTab === 'chat' ? (
            <div className="h-full max-w-4xl mx-auto">
                <ChatInterface />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                 <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    {activeTab === 'documents' ? <FileText size={32} /> : <Briefcase size={32} />}
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">Coming Soon</h2>
                 <p className="text-slate-600 mb-6">
                   This feature is currently under development. Use the <strong>AI Coach Chat</strong> to get help with your {activeTab}.
                 </p>
                 <button 
                   onClick={() => setActiveTab('chat')}
                   className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-medium"
                 >
                   Go to Chat
                 </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;