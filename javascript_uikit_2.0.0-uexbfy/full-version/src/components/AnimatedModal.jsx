'use client';
import PropTypes from 'prop-types';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// @third-party
import { AnimatePresence, motion } from 'framer-motion';

/***************************  MODAL - ANIMATED  ***************************/

export default function AnimatedModal({ open, onClose, children, sx, modalSize }) {
  return (
    <AnimatePresence>
      {open && (
        <Modal
          open
          onClose={onClose}
          aria-labelledby="modal"
          aria-describedby="modal-content"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...sx }}
        >
          <Box
            sx={modalSize || { width: { xs: '95%', sm: '90%', md: '80%', lg: '70%' }, height: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0.75 }}
              transition={{ type: 'tween' }}
            >
              {children}
            </motion.div>
          </Box>
        </Modal>
      )}
    </AnimatePresence>
  );
}

AnimatedModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  sx: PropTypes.any,
  modalSize: PropTypes.any
};
