'use client';

import { useState, useRef, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import {
  Box,
  Fab,
  Card,
  CardHeader,
  CardContent,
  TextField,
  IconButton,
  Typography,
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Button,
  Fade
} from '@mui/material';

// Icons (using SVG directly if needed, or importing from a library if available.
// Assuming MUI Icons are not installed or I should check.
// `package.json` has `@mui/material`, so `@mui/icons-material` might be missing.
// I'll check `package.json` again. It has `@mui/material` but not `@mui/icons-material`.
// I will use SVGs or text for icons to avoid missing dependency errors.

const ChatIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SendIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MicIcon = ({ active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? '#ef4444' : 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy el asistente virtual de Capitalta. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userContext, setUserContext] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  const [isVoiceMode, setIsVoiceMode] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Generar o recuperar ID de sesión para persistencia
    let storedSessionId = localStorage.getItem('chatSessionId');
    if (!storedSessionId) {
      storedSessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', storedSessionId);
    }
    setSessionId(storedSessionId);

    const fetchUser = async () => {
      const supabase = createSupabaseBrowserClient();
      if (supabase) {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        if (user) {
          setUserContext({
            email: user.email,
            name: user.user_metadata?.full_name || 'Usuario',
            id: user.id
          });
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsVoiceMode(true); // Activar modo visual
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-MX';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Auto-enviar si estamos en modo voz
        handleSend(transcript);
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        // No cerrar modo voz inmediatamente para permitir reintentos
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert('Tu navegador no soporta reconocimiento de voz.');
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (textOverride = null) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], userContext, sessionId })
      });

      if (!response.ok) throw new Error('Error en la comunicación');

      const data = await response.json();
      const assistantMessage = data.message;

      setMessages((prev) => [...prev, assistantMessage]);
      // Detectar redirección en el contenido del mensaje
      if (assistantMessage.content.includes('/auth/registro') || assistantMessage.content.includes('REDIRECT_REGISTER')) {
        if (typeof window !== 'undefined') window.location.href = '/auth/registro';
      }

      speakText(assistantMessage.content);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Lo siento, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo.'
      };
      setMessages((prev) => [...prev, errorMessage]);
      speakText(errorMessage.content);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const contactWhatsApp = () => {
    const message = encodeURIComponent('Hola, me gustaría recibir más información sobre los créditos de Capitalta.');
    window.open(`https://wa.me/525500000000?text=${message}`, '_blank'); // Replace with real number
  };

  return (
    <>
      <Fade in={isOpen}>
        <Card
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: 350,
            height: 500,
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 6,
            borderRadius: 4
          }}
        >
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>AI</Avatar>}
            action={
              <IconButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </IconButton>
            }
            title="Asistente Capitalta"
            subheader="En línea"
            sx={{ borderBottom: '1px solid #eee', py: 1.5 }}
          />

          <CardContent
            sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1, position: 'relative' }}
          >
            {isVoiceMode && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(255,255,255,0.95)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3
                }}
              >
                <Box
                  sx={{ position: 'relative', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {/* Visualizador de onda simulado */}
                  {(isListening || isSpeaking) && (
                    <>
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          bgcolor: isSpeaking ? 'primary.light' : 'error.light',
                          opacity: 0.3,
                          animation: 'pulse 1.5s infinite'
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '70%',
                          height: '70%',
                          borderRadius: '50%',
                          bgcolor: isSpeaking ? 'primary.main' : 'error.main',
                          opacity: 0.5,
                          animation: 'pulse 1.5s infinite 0.5s'
                        }}
                      />
                    </>
                  )}
                  <Avatar sx={{ width: 60, height: 60, bgcolor: isSpeaking ? 'primary.dark' : isListening ? 'error.dark' : 'grey.500' }}>
                    {isSpeaking ? <ChatIcon /> : <MicIcon active={true} />}
                  </Avatar>
                </Box>

                <Typography variant="h6" align="center" sx={{ px: 2 }}>
                  {isSpeaking ? 'Hablando...' : isListening ? 'Escuchando...' : 'Toque para hablar'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" color="error" onClick={() => setIsVoiceMode(false)}>
                    Salir
                  </Button>
                  {!isListening && !isSpeaking && (
                    <Button variant="contained" onClick={startListening}>
                      Hablar
                    </Button>
                  )}
                </Box>
                <style>
                  {`
                    @keyframes pulse {
                      0% { transform: scale(1); opacity: 0.5; }
                      50% { transform: scale(1.2); opacity: 0.2; }
                      100% { transform: scale(1); opacity: 0.5; }
                    }
                  `}
                </style>
              </Box>
            )}

            <List sx={{ p: 0 }}>
              {messages.map((msg, index) => (
                <ListItem key={index} alignItems="flex-start" sx={{ px: 0, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  <ListItemAvatar sx={{ minWidth: 40, mr: msg.role === 'user' ? 0 : 1, ml: msg.role === 'user' ? 1 : 0 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: msg.role === 'user' ? 'secondary.main' : 'primary.main'
                      }}
                    >
                      {msg.role === 'user' ? 'U' : 'AI'}
                    </Avatar>
                  </ListItemAvatar>
                  <Box
                    sx={{
                      bgcolor: msg.role === 'user' ? 'secondary.light' : 'grey.100',
                      color: msg.role === 'user' ? 'secondary.contrastText' : 'text.primary',
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: '80%'
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {msg.content}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
              {isLoading && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 40, mr: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>AI</Avatar>
                  </ListItemAvatar>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'grey.100' }}>
                    <CircularProgress size={20} />
                  </Box>
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>
          </CardContent>

          <Box sx={{ px: 2, py: 1, borderTop: '1px solid #eee' }}>
            <Button
              variant="outlined"
              color="success"
              fullWidth
              size="small"
              startIcon={<WhatsAppIcon />}
              onClick={contactWhatsApp}
              sx={{ mb: 1 }}
            >
              Contactar por WhatsApp
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton aria-label="microphone" onClick={startListening} color={isListening ? 'error' : 'default'} disabled={isLoading}>
                <MicIcon active={isListening} />
              </IconButton>
              <TextField
                fullWidth
                placeholder={isListening ? 'Escuchando...' : 'Escribe un mensaje...'}
                variant="outlined"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading || isListening}
              />
              <IconButton color="primary" aria-label="send" onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
                {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Fade>

      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </>
  );
}
