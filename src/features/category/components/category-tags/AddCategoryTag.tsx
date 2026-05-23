import { IoMdAddCircleOutline } from 'react-icons/io';

type PropTypes = {
  label: string;
  openModal: () => void;
};

const AddCategoryTag = ({ label, openModal }: PropTypes) => {
  return (
    <button
      onClick={openModal}
      className="w-fit flex items-center gap-1 rounded-full text-white px-4 py-2 cursor-pointer bg-[#2A7AE4] hover:bg-[#1F63C9] active:bg-[#1958B0]"
      type="button"
      data-test="open-add-category-modal-button"
    >
      <IoMdAddCircleOutline className="text-[26px]" />
      <span>{label}</span>
    </button>
  );
};

export default AddCategoryTag;
