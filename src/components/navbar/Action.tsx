import Button from '@/components/ui/actions/Button';
import { AuthRoutes } from '@/configs/router/AuthRoutes';

type PropTypes = {
  connected: boolean;
};
const Action = ({ connected }: PropTypes) => {
  if (connected) {
    return (
      <Button
        data-test="sign-out"
        to={AuthRoutes.SIGN_OUT}
        innerText={'Logout'}
        colorFill={connected}
        width={180}
      />
    );
  }
  return (
    <Button
      data-test="sign-in"
      to={AuthRoutes.SIGN_IN}
      innerText={'Login'}
      colorFill={connected}
      width={180}
    />
  );
};

export default Action;
