'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';

// @project
import { Footer7 } from '@/blocks/footer';
import { Navbar10 } from '@/blocks/navbar';
import { NavbarContent10 } from '@/blocks/navbar/navbar-content';

// @data
import { navbar } from './data';

const headerColor = { bgcolor: 'grey.100' };

/***************************  LAYOUT - MAIN  ***************************/

export default function MainLayout({ children }) {
  return (
    <>
      {/* header section */}
      <Box sx={headerColor}>
        <Navbar10 triggerSX={headerColor}>
          <NavbarContent10 {...navbar} />
        </Navbar10>
      </Box>

      {/* app/(landing)/* */}
      <main>{children}</main>

      {/* footer section */}
      <Footer7 />
    </>
  );
}

MainLayout.propTypes = { children: PropTypes.any };
