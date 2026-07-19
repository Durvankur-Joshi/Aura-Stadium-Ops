import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, MessageSender } from './types';
import { INITIAL_MESSAGE, ERROR_MESSAGE } from './constants';
import { ChatHeader } from './components/ChatHeader';
import { MessageBubble } from './components/MessageBubble';
import { ActionDock } from './components/ActionDock';
import { RewardCard } from './components/RewardCard';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { ApiService } from './services/apiService';

export default function App() {
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [language, setLanguage] = useState('English');
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [rewardCode, setRewardCode] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, rewardCode, isAiThinking]);

  // Centralized logic to communicate with Gemini AI
  const sendToGemini = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: MessageSender.USER,
      timestamp: 'Just now'
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsAiThinking(true);

    try {
      const data = await ApiService.negotiateWithAi(text, language);
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: data.speech,
        sender: MessageSender.AI,
        timestamp: 'Just now'
      }]);
      
      if (data.reward_code) {
        setTimeout(() => setRewardCode(data.reward_code || null), 1000);
      }
    } catch (error) {
      console.error("Backend Error:", error);
      setMessages(prev => [...prev, { ...ERROR_MESSAGE, id: Date.now().toString() }]);
    } finally {
      setIsAiThinking(false);
    }
  }, [language]);

  // Speech Recognition Hook
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition({
    language,
    onTranscriptComplete: sendToGemini
  });

  const handleQuickAction = useCallback((actionText: string) => {
    if (isRecording) stopRecording();
    sendToGemini(actionText);
  }, [isRecording, stopRecording, sendToGemini]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      const transcript = stopRecording();
      if (transcript.trim()) {
        sendToGemini(transcript.trim());
      }
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording, sendToGemini]);

  return (
    <div className="min-h-screen bg-aura-dark text-white flex justify-center">
      <div className="w-full max-w-md bg-gray-900/40 flex flex-col relative overflow-hidden shadow-2xl border-x border-gray-800">
        
        <ChatHeader language={language} onLanguageChange={setLanguage} />

        <main 
          className="flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col space-y-5 pb-44" 
          aria-live="polite"
          aria-atomic="false"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {isAiThinking && (
            <div className="flex flex-col items-start max-w-[85%] animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className="bg-aura-card border border-gray-700/60 rounded-2xl rounded-tl-sm p-4 shadow-lg backdrop-blur-md" aria-label="Aura is thinking">
                <span className="flex items-center text-aura-primary">
                  <span className="h-2 w-2 bg-aura-primary rounded-full mr-1 animate-ping"></span>
                  <span className="h-2 w-2 bg-aura-primary rounded-full mr-1 animate-ping delay-100"></span>
                  <span className="h-2 w-2 bg-aura-primary rounded-full animate-ping delay-200"></span>
                </span>
              </div>
              <span className="text-[10px] font-medium text-gray-500 mt-2 mx-2">Aura AI is thinking...</span>
            </div>
          )}

          {rewardCode && <RewardCard rewardCode={rewardCode} />}

          <div ref={chatEndRef} />
        </main>

        <ActionDock 
          isRecording={isRecording}
          isAiThinking={isAiThinking}
          onToggleRecording={toggleRecording}
          onQuickAction={handleQuickAction}
        />
        
      </div>
    </div>
  );
}

export default App;
