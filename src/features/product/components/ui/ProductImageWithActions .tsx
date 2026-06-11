import { BiSolidTrashAlt } from 'react-icons/bi';
import { RiPencilFill } from 'react-icons/ri';

import Spinner from '@/components/ui/feedback/Spinner';
import ProductImage from '@/features/product/components/ui/ProductImage';

type PropTypes = {
  height?: number | string;
  onDelete?: () => void;
  onEdit?: () => void;
  disabled?: boolean;
  showSpinner?: boolean;
  url: string;
  dataTest?: string;
};

const ProductImageWithActions = ({
  height,
  onDelete,
  onEdit,
  disabled,
  showSpinner,
  url,
  dataTest,
}: PropTypes) => {
  const actions = [
    {
      name: 'deleteIcon',
      Icon: BiSolidTrashAlt,
      onClick: onDelete,
      showSpinner: showSpinner,
      dataTest: 'delete-button',
    },
    {
      name: 'editIcon',
      Icon: RiPencilFill,
      onClick: onEdit,
      showsSpinner: false,
      dataTest: 'edit-button',
    },
  ].filter((action) => action.onClick);

  return (
    <div className="relative" {...(dataTest && { 'data-test': dataTest })}>
      <ProductImage height={height} url={url} />
      <div className="absolute top-0 right-0 flex gap-4 text-[#FFFFFF] text-[24px] m-2">
        {actions.map(({ name, Icon, onClick, showsSpinner, dataTest }) => (
          <button
            key={name}
            className="transition-transform active:scale-90 cursor-pointer"
            onClick={onClick}
            disabled={disabled}
            data-test={dataTest}
            type="button"
          >
            {showsSpinner ? (
              <Spinner size={24} />
            ) : (
              <Icon className="hover:text-[#2A7AE4]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageWithActions;
