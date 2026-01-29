'use client';

import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Box,
  Avatar
} from '@mui/material';

// Iconos simples (svg)
const VisibilityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export default function LeadsTable({ conversations }) {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleClose = () => setSelectedChat(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-MX');
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Sesión / Usuario</TableCell>
              <TableCell>Resumen</TableCell>
              <TableCell>Mensajes</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversations.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" sx={{ py: 2, color: 'text.secondary' }}>
                    No hay conversaciones registradas aún.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {conversations.map((chat) => (
              <TableRow key={chat.id}>
                <TableCell>{formatDate(chat.updated_at || chat.created_at)}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {chat.usuario_id ? 'Usuario Registrado' : 'Visitante Anónimo'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                      {chat.session_id ? `${chat.session_id.substring(0, 12)}...` : 'N/A'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ 
                    maxWidth: 300, 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {chat.resumen || 'Sin resumen'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${chat.mensajes?.length || 0} msgs`} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => setSelectedChat(chat)} size="small" color="primary">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedChat} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Detalle de Conversación</DialogTitle>
        <DialogContent dividers>
          {selectedChat && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {selectedChat.mensajes?.map((msg, idx) => (
                <Box 
                  key={idx} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    gap: 1
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: msg.role === 'user' ? 'secondary.main' : 'primary.main',
                      fontSize: 14
                    }}
                  >
                    {msg.role === 'user' ? 'U' : 'AI'}
                  </Avatar>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      bgcolor: msg.role === 'user' ? 'secondary.light' : 'grey.100',
                      color: msg.role === 'user' ? 'secondary.contrastText' : 'text.primary',
                      maxWidth: '80%',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
                    </Typography>
                    {msg.role === 'tool' && (
                       <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic', opacity: 0.7 }}>
                         Tool Output: {msg.name}
                       </Typography>
                    )}
                    {msg.tool_calls && (
                       <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic', opacity: 0.7 }}>
                         Tool Call: {msg.tool_calls[0].function.name}
                       </Typography>
                    )}
                  </Paper>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
