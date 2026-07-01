import { IoMdClose } from 'react-icons/io';

type PropTypes = {
  onClose: () => void;
};

const CloseButton = ({ onClose }: PropTypes) => {
  return (
    <button
      onClick={onClose}
      className="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
      data-test="close-button"
      type="button"
    >
      <IoMdClose className="text-[22px] lg:text-[32px]" />
    </button>
  );
};

export default CloseButton;
