import PropTypes from 'prop-types';
import Card from '@mui/material/Card';

const modalCardSX = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  borderRadius: 4,
  overflow: 'hidden'
};

/***************************  MODAL - CARD  ***************************/

function ModalCard({ children, sx, ref, ...rest }) {
  return (
    <Card sx={{ ...modalCardSX, ...sx }} ref={ref} {...rest}>
      {children}
    </Card>
  );
}

export default ModalCard;

ModalCard.propTypes = { children: PropTypes.node, sx: PropTypes.any, ref: PropTypes.any, rest: PropTypes.any };
