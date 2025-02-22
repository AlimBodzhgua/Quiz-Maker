import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { InputGroup, Tooltip, Input, InputRightAddon } from '@chakra-ui/react';
import { FC, memo, useEffect, useRef, useState } from 'react';

interface LinkPrivacyProps {
	link: string;
}

export const LinkPrivacy: FC<LinkPrivacyProps> = memo(({ link }) => {
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	
	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setIsCopied(false);
		}, 3000);
		
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isCopied]);
	
	const onCopy = () => {
		navigator.clipboard.writeText(link);
		setIsCopied(true);
	};

	return (
		<InputGroup size='sm'>
			<Input value={link} variant='filled' disabled />
			<Tooltip label={isCopied ? 'copied' : 'copy'} hasArrow>
				<InputRightAddon
					onClick={onCopy}
					_hover={{ cursor: 'pointer' }}
				>
					{isCopied ? <CheckIcon /> : <CopyIcon />}
				</InputRightAddon>
			</Tooltip>
		</InputGroup>
	)
});