import { FC, memo, useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { InputGroup, Tooltip, Input, InputRightAddon } from '@chakra-ui/react';
import { QuizService } from 'features/ManageQuizSetting/api/QuizService';
import { getQueryParam } from 'shared/utils';

interface LinkPrivacyProps {
	link: string;
	setLink: (link: string) => void;
}

export const LinkPrivacy: FC<LinkPrivacyProps> = memo((props) => {
	const { link, setLink } = props;
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

	useEffect(() => {
		const quizId = getQueryParam('id');

		if (!link.length) {
			QuizService.generateLink(quizId).then((data) => {
				setLink(data.link)
			});
		}
	}, []);
	
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