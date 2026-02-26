import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWidget from '../components/ChatWidget';
import '@testing-library/jest-dom';

// Mock del cliente Supabase
jest.mock('../utils/supabaseClient', () => ({
  createSupabaseBrowserClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: null } })
    }
  }))
}));

// Mock de fetch global
global.fetch = jest.fn();

// Mock de SpeechRecognition
const mockSpeechRecognition = jest.fn();
mockSpeechRecognition.mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  onstart: null,
  onresult: null,
  onerror: null,
  onend: null
}));
window.SpeechRecognition = mockSpeechRecognition;
window.webkitSpeechRecognition = mockSpeechRecognition;

// Mock de SpeechSynthesis
window.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  onvoiceschanged: null
};
window.SpeechSynthesisUtterance = jest.fn();

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('ChatWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders chat widget closed by default', () => {
    render(<ChatWidget />);
    const chatButton = screen.getByLabelText('chat');
    expect(chatButton).toBeInTheDocument();
    expect(screen.queryByText('Asistente Capitalta')).not.toBeVisible();
  });

  test('opens chat when button is clicked', () => {
    render(<ChatWidget />);
    const chatButton = screen.getByLabelText('chat');
    fireEvent.click(chatButton);
    expect(screen.getByText('Asistente Capitalta')).toBeVisible();
  });

  test('sends a message and displays response', async () => {
    // Mock de respuesta exitosa
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: { role: 'assistant', content: 'Respuesta de prueba' }
      })
    });

    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText('chat'));

    const input = screen.getByPlaceholderText('Escribe un mensaje...');
    const sendButton = screen.getByRole('button', { name: /send/i }); // Ajustar según tu icono

    fireEvent.change(input, { target: { value: 'Hola' } });
    fireEvent.click(sendButton);

    expect(input).toBeDisabled(); // Loading state

    await waitFor(() => {
      expect(screen.getByText('Respuesta de prueba')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText('chat'));

    const input = screen.getByPlaceholderText('Escribe un mensaje...');
    fireEvent.change(input, { target: { value: 'Hola' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i })); // Ajustar según tu icono

    await waitFor(() => {
      expect(screen.getByText(/problema al procesar/i)).toBeInTheDocument();
    });
  });
});
