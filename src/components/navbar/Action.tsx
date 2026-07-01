import Button from '@/components/ui/buttons/Button';
import { AuthRoutes } from '@/configs/router/AuthRoutes';

type PropTypes = {
  connected: boolean;
  isSticky: boolean;
};

const Action = ({ connected, isSticky }: PropTypes) => {
  if (connected) {
    return (
      <Button
        data-test="sign-out"
        to={AuthRoutes.SIGN_OUT}
        innerText={'Logout'}
        colorFill={connected}
        paddingY={isSticky ? 7 : 13}
        paddingX={isSticky ? 35 : 60}
      />
    );
  }
  return (
    <Button
      data-test="sign-in"
      to={AuthRoutes.SIGN_IN}
      innerText={'Login'}
      colorFill={connected}
      paddingY={isSticky ? 7 : 13}
      paddingX={isSticky ? 35 : 60}
    />
  );
};

export default Action;
