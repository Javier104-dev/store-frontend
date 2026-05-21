import CircularProgress from '@mui/material/CircularProgress';
import type { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

type PropTypes = {
	innerText: string;
	colorFill: boolean;
	width?: number;
	isLoading?: boolean;
	onClick?: () => void;
	to?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
	innerText,
	colorFill,
	width,
	isLoading = false,
	onClick,
	to,
	...props
}: PropTypes) => {
	const navigate = useNavigate();

	const buttonStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: colorFill ? '#FFFFFF' : ' #2A7AE4',
		border: colorFill ? 'none' : '1px solid #2A7AE4',
		width: width ? `${width}px` : '100%',
		height: '50px',
	};

	const spinnerStyle = {
		color: colorFill ? '#FFFFFF' : ' #2A7AE4',
	};

	const backgroundColor = colorFill
		? 'bg-[#2A7AE4] hover:bg-[#1F63C9] active:bg-[#1958B0]'
		: 'bg-[#FFFFFF] hover:bg-[#E8F1FF] active:bg-[#DCEBFF]';

	const buttonClass = `${backgroundColor} active:scale-95 transition-transform`;

	const handleClick = () => {
		if (onClick) onClick();
		if (to) navigate(to);
	};

	return (
		<button
			onClick={handleClick}
			style={buttonStyle}
			className={buttonClass}
			{...props}
		>
			{isLoading ? (
				<CircularProgress size={16} style={spinnerStyle} />
			) : (
				innerText
			)}
		</button>
	);
};

export default Button;
