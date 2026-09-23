import { Link } from 'react-router-dom';

import storeSvg from '@assets/store.svg';

type PropTypes = {
  width: number;
  height: number;
  to: string;
};

const Logo = ({ width, height, to }: PropTypes) => {
  return (
    <Link to={to} data-test="store-logo">
      <img
        className="transition-all duration-300"
        src={storeSvg}
        width={width}
        height={height}
        alt="Store Logo"
      />
    </Link>
  );
};

export default Logo;
