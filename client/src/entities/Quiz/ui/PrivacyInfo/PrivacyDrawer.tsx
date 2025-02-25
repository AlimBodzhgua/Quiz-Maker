import { FC, memo, useRef } from 'react';
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { PrivacyInfo } from './PrivacyInfo';
import type { Quiz } from '../../model/types';

interface PrivacyDrawerProps {
	quiz: Quiz;
}

export const PrivacyDrawer: FC<PrivacyDrawerProps> = memo((props) => {
	const { quiz } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	
	return (
		<>
			<Button
				ref={btnRef}
				onClick={onOpen}
				leftIcon={<LockIcon />}
				size='xs'
				bgColor='#e6007e'
				bgImage='linear-gradient(to right, #ff512f 0%, #dd2476 51%, #ff512f 100%)'
				color='#ffff'
				_hover={{ color: '#dcd9d9' }}
				_active={{ color: 'none'}}
			>
				Privacy
			</Button>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				finalFocusRef={btnRef}
				placement='left'
				size='sm'
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader>Privacy Info</DrawerHeader>
					<DrawerCloseButton />

					<DrawerBody>
						<PrivacyInfo quiz={quiz}/>
					</DrawerBody>

					<DrawerFooter>
						<Button colorScheme='blue' variant='outline' mr={3} onClick={onClose}>
							Close
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
});
