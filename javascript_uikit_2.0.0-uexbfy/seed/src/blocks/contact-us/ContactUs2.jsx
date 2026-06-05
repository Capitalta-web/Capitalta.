'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import { ContactUsForm1 } from '@/components/contact-us';
import ContainerWrapper from '@/components/ContainerWrapper';
import { GraphicsCard } from '@/components/cards';
import { SECTION_COMMON_PY } from '@/utils/constant';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';

/***************************  CONTACT US - CARD  ***************************/

function ContactCard({ icon, title, content, link }) {
  return (
    <>
      <Box sx={{ '& svg': { width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } } }}>
        <SvgIcon {...(typeof icon === 'string' ? { name: icon } : { ...icon })} color="text.primary" stroke={1} />
      </Box>
      <Typography variant="h4" sx={{ color: 'text.secondary', mt: { xs: 1.5, sm: 3 }, mb: { xs: 0.5, sm: 1 } }}>
        {title}
      </Typography>
      <Link
        component={NextLink}
        variant="h6"
        color="text.primary"
        href={link ? link : ''}
        sx={{ '&:hover': { color: 'primary.dark' } }}
        rel="noopener noreferrer"
        aria-label="contact-content"
      >
        {content}
      </Link>
    </>
  );
}

/***************************  CONTACT US - 2  ***************************/

/**
 *
 * Demos:
 * - [ContactUs2](https://www.saasable.io/blocks/contact-us/contact-us2)
 *
 * API:
 * - [ContactUs2 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/contact-us/contactus2#props-details)
 */

export default function ContactUs2({ heading, caption, contactDetails, bgImage }) {
  const sectionPadding = { xs: 2, sm: 4, md: 5 };
  const boxTopPadding = { xs: 1.5, sm: 4 };
  const boxSidePadding = { sm: 3 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption }} />
        </motion.div>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.4
              }}
              style={{ height: '100%' }}
            >
              <GraphicsCard overLay bgImage={bgImage} sx={{ height: 1 }}>
                <Stack sx={{ justifyContent: 'flex-end', height: 1, p: sectionPadding }}>
                  <Grid container>
                    <Grid size={12}>
                      <ContactCard icon="tabler-map-pin" title="Visit us" content={contactDetails.address} />
                      <Divider sx={{ borderColor: 'background.default', mt: { xs: 1.5, sm: 2.5, md: 4 } }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ pt: boxTopPadding, pb: { xs: 1.5, sm: 0 }, pr: boxSidePadding, height: 1 }}>
                        <ContactCard
                          icon="tabler-mail"
                          title="Chat to sales"
                          content={contactDetails.email}
                          link={`mailto:${contactDetails.email}`}
                        />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ height: 1 }}>
                        <Divider
                          flexItem
                          sx={{
                            borderColor: 'background.default',
                            /**
                             * Sets the border orientation of the divider based on the screen size.
                             * - If the screen size is small, the orientation is 'horizontal'.
                             * - If the screen size is medium or large, the orientation 'vertical'.
                             * orientation={!downSM ? 'vertical' : 'horizontal'}
                             */
                            borderRightWidth: { xs: 'unset', sm: 'thin' },
                            borderBottomWidth: { xs: 'thin', sm: 0 }
                          }}
                        />
                        <Box sx={{ pt: boxTopPadding, pl: boxSidePadding }}>
                          <ContactCard
                            icon="tabler-phone"
                            title="Call us"
                            content={contactDetails.phone}
                            link={`tel:${contactDetails.phone}`}
                          />
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </GraphicsCard>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.5
              }}
              style={{ height: '100%' }}
            >
              <GraphicsCard sx={{ height: 1 }}>
                <Box sx={{ p: sectionPadding }}>
                  <ContactUsForm1 />
                </Box>
              </GraphicsCard>
            </motion.div>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

ContactCard.propTypes = { icon: PropTypes.any, title: PropTypes.any, content: PropTypes.any, link: PropTypes.any };

ContactUs2.propTypes = { heading: PropTypes.any, caption: PropTypes.any, contactDetails: PropTypes.any, bgImage: PropTypes.any };
