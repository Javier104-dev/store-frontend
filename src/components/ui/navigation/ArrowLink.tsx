import { IoArrowForwardSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type PropTypes = {
	label: string;
	to: string;
};

const ArrowLink = ({ to, label }: PropTypes) => {
	return (
		<Link to={to} className="font-bold text-[16px] text-[#2A7AE4]">
			<div className="flex gap-2 items-center">
				<p>{label}</p>
				<IoArrowForwardSharp fontSize={24} />
			</div>
		</Link>
	);
};

export default ArrowLink;
