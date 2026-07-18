import React, { useState, useEffect, useRef } from 'react';
import { Mic, MapPin, ShieldCheck, Ticket, Pizza, Flame, Navigation, Activity } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { httpsCallable } from 'firebase/functions';
import { functions } from './config/firebase';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: string;
}

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('English');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      text: "Hi there! I'm Aura, your AI event companion. I can help you find your seat, locate accessible routes, or guide you during an emergency. How can I assist you?",
      sender: 'ai',
      timestamp: 'Just now'
    }
  ]);
  const [rewardCode, setRewardCode] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isRecording, transcript, rewardCode, isAiThinking]);

  useEffect(() => {
    interface SpeechEvent extends Event {
      results: { [index: number]: { [index: number]: { transcript: string } } };
    }
    
    interface BackendResponse {
      speech: string;
      reward_code?: string;
      status: string;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'Spanish' ? 'es-ES' : 
                                    language === 'Hindi' ? 'hi-IN' : 
                                    language === 'French' ? 'fr-FR' : 'en-US';

      recognitionRef.current.onresult = (event: SpeechEvent) => {
        const transcript = event.results[0][0].transcript;
        sendToGemini(transcript);
      };

      recognitionRef.current.onerror = (event: Event) => {
        console.error("Speech recognition error", event);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [language]);

  const sendToGemini = (text: string) => {
    interface BackendResponse {
      speech: string;
      reward_code?: string;
      status: string;
    }
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, newUserMsg]);
    setIsAiThinking(true);
    // Standard fetch call to the new Express backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://aura-stadium-ops.onrender.com';
    
    fetch(`${backendUrl}/api/negotiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transcript: text,
        userId: 'user_42_mock',
        zoneId: 'south_gate',
        language: language
      })
    })
    .then(res => res.json())
    .then((data: BackendResponse) => {
      setIsAiThinking(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: data.speech,
        sender: 'ai',
        timestamp: 'Just now'
      }]);
      
      if (data.reward_code) {
        setTimeout(() => {
          setRewardCode(data.reward_code);
        }, 1000);
      }
    })
    .catch((error) => {
      console.error("Backend Error:", error);
      setIsAiThinking(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I'm having trouble connecting right now, but please stay safe.",
        sender: 'ai',
        timestamp: 'Just now'
      }]);
    });
  };

  const handleQuickAction = (actionText: string) => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
    setTranscript('');
    sendToGemini(actionText);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      
      const finalText = transcript.trim();
      if (finalText) {
        setTranscript('');
        sendToGemini(finalText);
      }
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const quickActions = React.useMemo(() => [
    { label: 'Food nearby', icon: <Pizza size={14} /> },
    { label: 'Wheelchair Route', icon: <Activity size={14} /> },
    { label: 'Find my seat', icon: <Navigation size={14} /> },
    { label: 'Report Fire', icon: <Flame size={14} className="text-aura-danger" /> }
  ], []);

  return (
    <div className="min-h-screen bg-aura-dark text-white flex justify-center">
      <div className="w-full max-w-md bg-gray-900/40 flex flex-col relative overflow-hidden shadow-2xl border-x border-gray-800">
        
        <header className="p-6 pb-4 pt-8 flex justify-between items-center z-10 bg-gradient-to-b from-aura-dark to-transparent">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Aura Companion</h1>
            <div className="flex items-center text-[11px] font-medium text-aura-success mt-1">
              <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Secure Connection
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select Language"
              className="bg-gray-800 text-xs font-semibold text-white px-2 py-1.5 rounded-md border border-gray-700 outline-none cursor-pointer focus:ring-2 focus:ring-aura-primary focus:border-transparent transition-all"
            >
              <option value="English">EN</option>
              <option value="Hindi">HI</option>
              <option value="Spanish">ES</option>
              <option value="French">FR</option>
            </select>
            <div className="bg-gray-800/80 rounded-full px-3 py-1.5 flex items-center border border-gray-700 backdrop-blur-md">
              <MapPin size={12} className="text-aura-primary mr-1.5" aria-hidden="true" />
              <span className="text-xs font-semibold">South Gate</span>
            </div>
          </div>
        </header>

        <main 
          className="flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col space-y-5 pb-44" 
          aria-live="polite"
          aria-atomic="false"
        >
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col max-w-[85%] animate-in slide-in-from-bottom-2 fade-in duration-300 ${msg.sender === 'user' ? 'items-end self-end' : 'items-start'}`}>
              <div className={`p-4 shadow-lg backdrop-blur-md ${
                msg.sender === 'user' 
                  ? 'bg-aura-primary text-white rounded-2xl rounded-tr-sm shadow-aura-primary/20' 
                  : 'bg-aura-card border border-gray-700/60 rounded-2xl rounded-tl-sm'
              }`}>
                <p className="text-sm leading-relaxed text-gray-200">{msg.text}</p>
              </div>
              <span className="text-[10px] font-medium text-gray-500 mt-2 mx-2">
                {msg.sender === 'ai' ? 'Aura AI' : 'You'} • <span className="sr-only">Sent at</span> {msg.timestamp}
              </span>
            </div>
          ))}

          {isRecording && (
            <div className="flex flex-col items-end self-end max-w-[85%] animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className="bg-aura-primary text-white rounded-2xl rounded-tr-sm p-4 shadow-lg shadow-aura-primary/20">
                <p className="text-sm leading-relaxed font-medium" aria-live="assertive">
                  {transcript || (
                    <span className="animate-pulse flex items-center">
                      <span className="h-1.5 w-1.5 bg-white rounded-full mr-1 animate-bounce"></span>
                      <span className="h-1.5 w-1.5 bg-white rounded-full mr-1 animate-bounce delay-100"></span>
                      <span className="h-1.5 w-1.5 bg-white rounded-full mr-2 animate-bounce delay-200"></span>
                      Listening...
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

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

          {rewardCode && (
            <div className="mt-8 flex flex-col items-center bg-white rounded-2xl p-6 shadow-2xl shadow-aura-success/20 animate-in zoom-in fade-in duration-500" role="alert" aria-live="assertive">
              <div className="bg-aura-success/10 text-aura-success p-2 rounded-full mb-4">
                <Ticket size={32} aria-hidden="true" />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-1">Exclusive Perk Unlocked</h3>
              <p className="text-gray-500 text-xs text-center mb-6">Scan this code at the East Concourse Bar</p>
              
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl">
                <QRCodeSVG value={rewardCode} size={180} />
              </div>
              
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-6 font-bold" aria-label={`Reward code is ${rewardCode}`}>{rewardCode}</p>
            </div>
          )}

          <div ref={chatEndRef} />
        </main>

        <nav className="absolute bottom-0 w-full bg-gradient-to-t from-aura-dark via-aura-dark to-transparent pt-12 flex flex-col items-center pointer-events-none z-20" aria-label="Quick Actions and Voice Input">
          
          {/* Quick Actions Scrollable Grid */}
          <div className="flex overflow-x-auto hide-scrollbar space-x-2 px-6 mb-6 w-full pointer-events-auto" role="list">
            {quickActions.map(action => (
              <button 
                key={action.label}
                onClick={() => handleQuickAction(action.label)}
                disabled={isAiThinking}
                aria-label={`Ask Aura about ${action.label}`}
                className="whitespace-nowrap flex items-center bg-gray-800/90 hover:bg-gray-700 border border-gray-700 rounded-full px-4 py-2 text-xs font-medium text-gray-200 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-aura-primary focus:ring-offset-2 focus:ring-offset-gray-900"
                role="listitem"
              >
                <span className="mr-2 opacity-80" aria-hidden="true">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>

          <div className="pb-8 flex flex-col items-center w-full pointer-events-auto">
            <button 
              onClick={toggleRecording}
              disabled={isAiThinking}
              aria-label={isRecording ? "Stop recording voice message" : "Start recording voice message"}
              aria-pressed={isRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-aura-primary focus:ring-offset-4 focus:ring-offset-aura-dark ${
                isRecording 
                  ? 'bg-aura-danger shadow-aura-danger/40 scale-110' 
                  : isAiThinking
                  ? 'bg-gray-700 shadow-gray-700/40 opacity-50 cursor-not-allowed'
                  : 'bg-aura-primary shadow-aura-primary/40 hover:scale-105'
              }`}
            >
              <Mic size={32} className={`text-white ${isRecording ? 'animate-pulse' : ''}`} aria-hidden="true" />
            </button>
            <p className="text-[10px] text-gray-400 mt-4 font-bold tracking-widest uppercase" aria-live="polite">
              {isRecording ? 'Tap to Send' : isAiThinking ? 'Analyzing' : 'Tap to Speak'}
            </p>
          </div>
        </nav>
        
      </div>
    </div>
  );
}

export default App;
