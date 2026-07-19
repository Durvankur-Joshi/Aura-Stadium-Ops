import { useState, useEffect, useRef, useCallback } from 'react';
import { SpeechEvent } from '../types';

interface UseSpeechRecognitionProps {
  language: string;
  onTranscriptComplete: (transcript: string) => void;
}

/**
 * Custom hook to manage the Web Speech API lifecycle.
 */
export const useSpeechRecognition = ({ language, onTranscriptComplete }: UseSpeechRecognitionProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false; // Set to true if you want live text typing effect
      
      const langCode = language === 'Spanish' ? 'es-ES' : 
                       language === 'Hindi' ? 'hi-IN' : 
                       language === 'French' ? 'fr-FR' : 'en-US';
      recognitionRef.current.lang = langCode;

      recognitionRef.current.onresult = (event: SpeechEvent) => {
        const finalTranscript = event.results[0][0].transcript;
        onTranscriptComplete(finalTranscript);
      };

      recognitionRef.current.onerror = (event: Event) => {
        console.error("Speech recognition error", event);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onTranscriptComplete]);

  const startRecording = useCallback(() => {
    setInterimTranscript('');
    recognitionRef.current?.start();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    return interimTranscript;
  }, [interimTranscript]);

  return {
    isRecording,
    interimTranscript,
    startRecording,
    stopRecording
  };
};
