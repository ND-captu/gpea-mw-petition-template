import React, { useEffect, useState, useRef } from 'react';
import PetitionFooter from '@containers/petitionFooter';
import { useInView } from 'react-intersection-observer';
import { connect } from 'react-redux';
import { Box, Container, Image, useMediaQuery, Slide } from '@chakra-ui/react';
import HeroSection from './components/HeroSection';
import MainSection from './components/MainSection';
import Form from './components/Form';
import formContent from './form';
import SEO from './SEO';
import * as formActions from 'store/actions/action-types/form-actions';
import FixedCTA from './components/FixedCTA';

import desktopBannerImage from './images/Plastic-free-Marketplace-banner.jpg';
import mobileBannerImage from './images/Marketplace.jpg';

const maxWSize = 1200;

function Index({ setFormContent }) {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)'); // default md: '62em'
  const { ref, inView } = useInView({ threshold: 0 });
  const [showCTAButton, setShowCTAButton] = useState(false);
  const mobileForm = useRef(null);
  const executeScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setFormContent(formContent);
  }, []);

  useEffect(() => {
    if (isLargerThanLG) {
      setTimeout(() => {
        setShowCTAButton(false);
      }, 500);
      return;
    }
    setShowCTAButton(!inView && !isLargerThanLG);
  }, [inView, isLargerThanLG]);

  return (
    <>
      <SEO />
      <Box pos={'relative'} minH={{ base: '240px', md: '520px' }}>
        <Container maxW={`${maxWSize}px`}>
          <HeroSection />
        </Container>
        <Box
          zIndex={-1}
          pos={'absolute'}
          top={0}
          right={0}
          left={0}
          bottom={0}
          d={{ base: 'none', md: 'block' }}
        >
          <Image
            src={desktopBannerImage}
            height="100%"
            width="100%"
            objectFit="cover"
            objectPosition="65% 20%"
          />
        </Box>
        <Box
          zIndex={-1}
          pos={'absolute'}
          top={0}
          right={0}
          left={0}
          bottom={0}
          d={{ base: 'block', md: 'none' }}
        >
          <Image
            src={mobileBannerImage}
            height="100%"
            width="100%"
            objectFit="contain"
            objectPosition={'center'}
          />
        </Box>
      </Box>

      {/** Mobile form */}
      <Box ref={mobileForm}>
        <Box d={{ base: 'block', lg: 'none' }} mt={-4} ref={ref}>
          <Form />
        </Box>
      </Box>
      {/** Mobile form End */}

      <Container maxW={`${maxWSize}px`}>
        <Box
          w={{ base: '100%', lg: 'md', xl: maxWSize / 2 }}
          py={10}
          pr={{ xl: 10 }}
          pb={16}
        >
          <MainSection />
        </Box>
      </Container>

      <PetitionFooter locale={'HKChinese'} />

      <Slide
        direction="bottom"
        in={showCTAButton}
        style={{ zIndex: 10 }}
        d={showCTAButton ? 'block' : 'none'}
      >
        <FixedCTA onClick={() => executeScroll(mobileForm)}>
          {formContent.mobile_cta ? formContent.mobile_cta : '立即捐款'}
        </FixedCTA>
      </Slide>
    </>
  );
}

const mapStateToProps = ({ status, theme, signup }) => {
  return { status, theme: theme.data, signup: signup.data };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFormContent: (data) => {
      dispatch({ type: formActions.SET_FORM, data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
