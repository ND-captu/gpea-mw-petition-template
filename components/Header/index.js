import { Box, Flex, Image, Container, Link, Button } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';

const WithSubnavigation = ({ href }) => {
	const logoChinese =
		'https://www.greenpeace.org/static/planet4-hongkong-stateless/2020/05/aa123dcd-gp-logo-2019-tc-white-web-01.png';
	const [testCond, setTestCond] = useState('A');
	useEffect(() => {
		window.__greenpeace__ = window.__greenpeace__ || {};
		window.__greenpeace__.onTestCondSettedHeader = function(  ) {
			// console.log('A/B Testing condition: '+window.testCond)
			setTestCond(window.testCond);
		}
		
	},[])
	const handleScroll = (target) => {
		if (!target) {
			return;
		}
		target.current?.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<Box
			bgColor={'brand.500'}
			// borderBottom={'1px solid var(--shades-100)'}
			// boxShadow={'var(--shadow-1)'}
			pos={'relative'}
			zIndex={3}
		>
			<Flex py={'12px'} align={'center'}>
				<Container maxW={'1200px'}>
					<Flex justify={ testCond === 'B' ? 'space-between' : 'center'} align={'center'}>
						{href ? (
							<Link href={href} isExternal="true">
								<Image
									src={logoChinese}
									maxW="220px"
									padding="2px"
									alt={'Greenpeace 綠色和平'}
								/>
							</Link>
						) : (
							<Image
								src={logoChinese}
								maxW="220px"
								padding="2px"
								alt={'Greenpeace 綠色和平'}
							/>
						)}
						{ testCond === 'B' && (
							<Button {...buttonStyleProps} onClick={() => handleScroll(target)}>
								{'捐助支持'}
							</Button>
						)}
					</Flex>
				</Container>
			</Flex>
		</Box>
	);
};

const buttonStyleProps = {
	width: 'auto',
	borderRadius: '4px',
	fontSize: '20px',
	fontWeight: '400',
	lineHeight: '34px',
	height: '34px',
	py: '0',
	px: '20px',
	color: 'white',
	bg: 'orange.500',
	d: { md: 'none' },
	_hover: { bg: 'orange.300' }
};

export default WithSubnavigation;
