import React, { useState, useEffect, useRef } from 'react';
import { Mic, MapPin, ShieldCheck, Ticket } from 'lucide-react';
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      text: "Hi there! I noticed the South Gate is currently experiencing heavy egress traffic. I can help you find a faster exit or offer you an exclusive perk to wait it out. How can I help?",
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
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      // STOP RECORDING & SEND TO GEMINI
      recognitionRef.current?.stop();
      setIsRecording(false);
      
      const finalText = transcript.trim();
      if (finalText) {
        // 1. Add user message to UI
        const newUserMsg: Message = {
          id: Date.now().toString(),
          text: finalText,
          sender: 'user',
          timestamp: 'Just now'
        };
        setMessages(prev => [...prev, newUserMsg]);
        setTranscript('');
        setIsAiThinking(true);
        
        // 2. Call the Real Cloud Function!
        const negotiateFn = httpsCallable(functions, 'negotiate');
        
        negotiateFn({
          transcript: finalText,
          // We use a mock user ID and zone ID for the hackathon demo
          userId: 'user_42_mock',
          zoneId: 'south_gate'
        }).then((result: any) => {
          const data = result.data;
          
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
        }).catch((error) => {
          console.error("Backend Error:", error);
          setIsAiThinking(false);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "I'm having trouble connecting right now, but please stay safe.",
            sender: 'ai',
            timestamp: 'Just now'
          }]);
        });
      }
    } else {
      // START RECORDING
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="min-h-screen bg-aura-dark text-white flex justify-center">
      <div className="w-full max-w-md bg-gray-900/40 flex flex-col relative overflow-hidden shadow-2xl border-x border-gray-800">
        
        <header className="p-6 pb-4 pt-8 flex justify-between items-center z-10 bg-gradient-to-b from-aura-dark to-transparent">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Aura Companion</h1>
            <div className="flex items-center text-[11px] font-medium text-aura-success mt-1">
              <ShieldCheck size={12} className="mr-1" /> Secure Connection
            </div>
          </div>
          <div className="bg-gray-800/80 rounded-full px-3 py-1.5 flex items-center border border-gray-700 backdrop-blur-md">
            <MapPin size={12} className="text-aura-primary mr-1.5" />
            <span className="text-xs font-semibold">South Gate</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col space-y-5 pb-36">
          
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
                {msg.sender === 'ai' ? 'Aura AI' : 'You'} • {msg.timestamp}
              </span>
            </div>
          ))}

          {/* User Transcript Preview */}
          {isRecording && (
            <div className="flex flex-col items-end self-end max-w-[85%] animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className="bg-aura-primary text-white rounded-2xl rounded-tr-sm p-4 shadow-lg shadow-aura-primary/20">
                <p className="text-sm leading-relaxed font-medium">
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

          {/* AI Thinking State */}
          {isAiThinking && (
            <div className="flex flex-col items-start max-w-[85%] animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className="bg-aura-card border border-gray-700/60 rounded-2xl rounded-tl-sm p-4 shadow-lg backdrop-blur-md">
                <span className="flex items-center text-aura-primary">
                  <span className="h-2 w-2 bg-aura-primary rounded-full mr-1 animate-ping"></span>
                  <span className="h-2 w-2 bg-aura-primary rounded-full mr-1 animate-ping delay-100"></span>
                  <span className="h-2 w-2 bg-aura-primary rounded-full animate-ping delay-200"></span>
                </span>
              </div>
              <span className="text-[10px] font-medium text-gray-500 mt-2 mx-2">Aura AI is thinking...</span>
            </div>
          )}

          {/* QR Reward Screen */}
          {rewardCode && (
            <div className="mt-8 flex flex-col items-center bg-white rounded-2xl p-6 shadow-2xl shadow-aura-success/20 animate-in zoom-in fade-in duration-500">
              <div className="bg-aura-success/10 text-aura-success p-2 rounded-full mb-4">
                <Ticket size={32} />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-1">Exclusive Perk Unlocked</h3>
              <p className="text-gray-500 text-xs text-center mb-6">Scan this code at the East Concourse Bar</p>
              
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl">
                <QRCodeSVG value={rewardCode} size={180} />
              </div>
              
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-6 font-bold">{rewardCode}</p>
            </div>
          )}

          <div ref={chatEndRef} />
        </main>

        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-aura-dark via-aura-dark to-transparent pt-12 pb-10 flex flex-col items-center pointer-events-none">
          <button 
            onClick={toggleRecording}
            disabled={isAiThinking}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl pointer-events-auto z-20 ${
              isRecording 
                ? 'bg-aura-danger shadow-aura-danger/40 scale-110' 
                : isAiThinking
                ? 'bg-gray-700 shadow-gray-700/40 opacity-50 cursor-not-allowed'
                : 'bg-aura-primary shadow-aura-primary/40 hover:scale-105'
            }`}
          >
            <Mic size={32} className={`text-white ${isRecording ? 'animate-pulse' : ''}`} />
          </button>
          <p className="text-[10px] text-gray-400 mt-6 font-bold tracking-widest uppercase">
            {isRecording ? 'Tap to Send' : isAiThinking ? 'Analyzing' : 'Tap to Speak'}
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default App;
