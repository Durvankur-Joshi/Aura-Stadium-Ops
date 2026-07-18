import '@testing-library/jest-dom';

// Mock SpeechRecognition for the Fan App tests
Object.defineProperty(window, 'SpeechRecognition', {
  writable: true,
  value: class MockSpeechRecognition {
    start() {}
    stop() {}
  }
});

Object.defineProperty(window, 'webkitSpeechRecognition', {
  writable: true,
  value: class MockSpeechRecognition {
    start() {}
    stop() {}
  }
});
