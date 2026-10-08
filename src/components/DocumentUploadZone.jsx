'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
  Alert,
  IconButton
} from '@mui/material';
import {
  IconCloudUpload,
  IconCheck,
  IconX,
  IconFile,
  IconFileText
} from '@tabler/icons-react';
import { validateFile, formatFileSize, getFileExtension, createFilePreview, revokeFilePreview } from '@/utils/documentValidation';

export default function DocumentUploadZone({
  documentType = 'identity',
  label = 'Sube tu documento',
  description = 'Arrastra o haz clic para seleccionar',
  onUpload = () => {},
  onError = () => {},
  allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'],
  maxSize = 5 * 1024 * 1024
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Reset success after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (preview) {
        revokeFilePreview(preview);
      }
    };
  }, [preview]);

  const onDrop = useCallback(
    acceptedFiles => {
      setError(null);
      setSuccess(false);

      if (acceptedFiles.length === 0) {
        setError('Por favor sube un archivo válido');
        onError({ error: 'No files accepted' });
        return;
      }

      const droppedFile = acceptedFiles[0];

      // Validate file
      const validation = validateFile(droppedFile, allowedExtensions);
      if (!validation.valid) {
        setError(validation.error);
        onError({ error: validation.error });
        return;
      }

      // Create preview for images
      if (droppedFile.type.startsWith('image/')) {
        const previewUrl = createFilePreview(droppedFile);
        setPreview(previewUrl);
      } else {
        setPreview(null);
      }

      setFile(droppedFile);
    },
    [allowedExtensions, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png']
    },
    multiple: false,
    disabled: uploading || success
  });

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      // Simulate upload progress for demo
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 200);

      // Send to API
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al subir documento');
      }

      const data = await response.json();
      setUploadProgress(100);

      // Success!
      setSuccess(true);
      setFile(null);
      if (preview) {
        revokeFilePreview(preview);
        setPreview(null);
      }

      // Call callback
      onUpload({
        documentType,
        fileName: file.name,
        fileSize: file.size,
        url: data.url,
        id: data.id
      });

      // Reset after success animation
      setTimeout(() => {
        setUploadProgress(0);
      }, 2000);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Error al subir el documento');
      onError({ error: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (preview) {
      revokeFilePreview(preview);
      setPreview(null);
    }
    setError(null);
    setSuccess(false);
    setUploadProgress(0);
  };

  const handleClick = () => {
    if (fileInputRef.current && !uploading && !success) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          p: 3,
          border: '2px solid',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          bgcolor: isDragActive ? 'primary.lighter' : 'background.paper',
          transition: 'all 0.2s ease',
          cursor: uploading || success ? 'default' : 'pointer'
        }}
      >
        <Stack spacing={2}>
          {/* Title and Description */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>

          {/* Upload Area */}
          <AnimatePresence mode="wait">
            {!file && !success ? (
              <motion.div
                key="upload-zone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  {...getRootProps()}
                  onClick={handleClick}
                  sx={{
                    p: 4,
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    textAlign: 'center',
                    bgcolor: isDragActive ? 'primary.lighter' : 'grey.50',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.lighter'
                    }
                  }}
                >
                  <input {...getInputProps()} ref={fileInputRef} />

                  <motion.div
                    animate={{ scale: isDragActive ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <IconCloudUpload
                        size={48}
                        color="currentColor"
                        style={{
                          color: isDragActive ? '#667eea' : '#9ca3af'
                        }}
                      />
                    </Box>
                  </motion.div>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDragActive ? 'primary.main' : 'text.primary'
                    }}
                  >
                    {isDragActive ? 'Suelta tu archivo aquí' : 'Arrastra o haz clic'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Formatos: {allowedExtensions.join(', ').toUpperCase()} • Máximo: 5 MB
                  </Typography>
                </Box>
              </motion.div>
            ) : file && !success ? (
              <motion.div
                key="file-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Stack spacing={2}>
                    {/* File Preview */}
                    {preview ? (
                      <Box
                        component="img"
                        src={preview}
                        alt="preview"
                        sx={{
                          maxHeight: 200,
                          maxWidth: '100%',
                          borderRadius: 1,
                          objectFit: 'contain'
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5
                        }}
                      >
                        <IconFile size={32} color="#667eea" />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(file.size)}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {/* Progress or Buttons */}
                    {uploading ? (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CircularProgress size={20} />
                          <Typography variant="caption" color="text.secondary">
                            {Math.round(uploadProgress)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={uploadProgress}
                          sx={{ borderRadius: 1 }}
                        />
                      </Box>
                    ) : (
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={handleUpload}
                          disabled={uploading}
                        >
                          Subir Documento
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={handleRemove}
                          disabled={uploading}
                          sx={{ minWidth: 'auto' }}
                        >
                          <IconX size={20} />
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </Box>
              </motion.div>
            ) : success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'success.lighter',
                    borderRadius: 2,
                    textAlign: 'center'
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <IconCheck size={48} color="#10b981" />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main', mb: 1 }}>
                    ¡Documento validado!
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {file?.name || 'Archivo'} subido correctamente
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      onClick={() => {
                        setSuccess(false);
                        setFile(null);
                        if (preview) {
                          revokeFilePreview(preview);
                          setPreview(null);
                        }
                      }}
                    >
                      Subir Otro
                    </Button>
                  </Stack>
                </Box>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>
      </Card>
    </motion.div>
  );
}
