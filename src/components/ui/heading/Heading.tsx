type PropTypes = {
  title: string;
};

const Heading = ({ title }: PropTypes) => {
  return (
    <div className="flex items-center justify-between">
      <h1
        className="font-bold text-[22px] lg:text-[32px]"
        data-test="section-title"
      >
        {title}
      </h1>
    </div>
  );
};

export default Heading;
