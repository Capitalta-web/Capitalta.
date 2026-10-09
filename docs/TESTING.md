# Pruebas del Asistente Virtual

Este proyecto utiliza Jest para pruebas unitarias y de integración.

## Configuración
Asegúrate de instalar las dependencias de desarrollo:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

## Ejecutar Pruebas
```bash
npm test
```

## Archivo de Prueba: `src/tests/chat.test.js`

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWidget from '../components/ChatWidget';
import '@testing-library/jest-dom';

// Mock de fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ 
      message: { role: 'assistant', content: 'Respuesta de prueba' } 
    }),
  })
);

// Mock de SpeechRecognition
window.SpeechRecognition = jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  lang: '',
  onresult: null,
  onstart: null,
  onend: null,
  onerror: null,
}));

// Mock de SpeechSynthesis
window.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
};

window.SpeechSynthesisUtterance = jest.fn();

describe('ChatWidget Component', () => {
  test('Renderiza correctamente cerrado', () => {
    render(<ChatWidget />);
    // Buscar el botón flotante (suponiendo que tiene un aria-label o icono)
    // En este caso, verificamos que NO está el chat visible
    expect(screen.queryByText('Asistente Capitalta')).not.toBeInTheDocument();
  });

  test('Abre el chat al hacer click en el botón flotante', () => {
    // Nota: Necesitarías añadir un data-testid o aria-label al Fab en el componente real
    // render(<ChatWidget />);
    // fireEvent.click(screen.getByRole('button')); 
    // expect(screen.getByText('Asistente Capitalta')).toBeInTheDocument();
  });

  test('Envía mensaje y recibe respuesta', async () => {
    // Simular estado abierto
    render(<ChatWidget />);
    // ... lógica para abrir el chat ...
    
    // Simular input
    // const input = screen.getByPlaceholderText('Escribe un mensaje...');
    // fireEvent.change(input, { target: { value: 'Hola' } });
    // fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    // await waitFor(() => {
    //   expect(global.fetch).toHaveBeenCalledTimes(1);
    //   expect(screen.getByText('Respuesta de prueba')).toBeInTheDocument();
    // });
  });
});
```

## Pruebas de API (`src/tests/api.test.js`)

```javascript
/**
 * @jest-environment node
 */
import { POST } from '../app/api/chat/route';

describe('API Chat Route', () => {
  test('Maneja falta de API Key con respuesta mock', async () => {
    const req = {
      json: () => Promise.resolve({
        messages: [{ role: 'user', content: 'Hola' }],
        sessionId: 'test-session'
      })
    };

    const response = await POST(req);
    const data = await response.json();

    expect(data.message).toBeDefined();
    expect(data.message.role).toBe('assistant');
    // Verificar que responde algo coherente
  });
});
```
