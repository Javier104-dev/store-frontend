import { Link } from 'react-router-dom';

import storeSvg from '@assets/store.svg';

type PropTypes = {
	width: number;
	height: number;
};

const Logo = ({ width, height }: PropTypes) => {
	return (
		<Link to="/">
			<img src={storeSvg} width={width} height={height} alt="Store Logo" />
		</Link>
	);
};

export default Logo;
