import { PRODUCT_IMAGES } from '@/features/product/constants/product-Images';

type PropTypes = {
  width?: number | string;
  height?: number | string;
  url: string;
};

const ProductImage = ({ width, height, url }: PropTypes) => {
  return (
    <div
      style={{
        ...(width && { width }),
        ...(height && { height }),
      }}
      className="overflow-hidden"
    >
      <img
        src={url ?? PRODUCT_IMAGES.NO_IMAGE}
        alt="img product"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
};

export default ProductImage;
