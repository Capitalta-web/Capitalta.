import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';

// @project
import { navbar } from '../landings/default/data';
import { Navbar10 } from '@/blocks/navbar';
import { NavbarContent10 } from '@/blocks/navbar/navbar-content';

const headerColor = { bgcolor: 'grey.100' };

/***************************  LANDING - SECTIONS  ***************************/

export default function SectionsLayout({ children }) {
  return (
    <>
      <Box sx={headerColor}>
        <Navbar10 triggerSX={headerColor}>
          <NavbarContent10 {...navbar} />
        </Navbar10>
      </Box>
      <main>{children}</main>
    </>
  );
}

SectionsLayout.propTypes = { children: PropTypes.any };
