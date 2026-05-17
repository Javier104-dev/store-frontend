import CircularProgress from '@mui/material/CircularProgress';

type PropTypes = {
	size?: number;
};

const Spinner = ({ size = 50 }: PropTypes) => {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<CircularProgress size={size} />
		</div>
	);
};

export default Spinner;
