import { IoMdClose } from 'react-icons/io';

type PropTypes = {
  onClose: () => void;
};

const CloseModalButton = ({ onClose }: PropTypes) => {
  return (
    <button
      onClick={onClose}
      className="absolute top-3 right-3 p-2 hover:bg-gray-200 rounded-full"
      data-test="close-modal-button"
    >
      <IoMdClose className="text-[22px] lg:text-[32px]" />
    </button>
  );
};

export default CloseModalButton;
