const Image = (props) => {
  return (
    <img
      {...props}
      onError={(e) => {
        const placeholderImage = `https://via.placeholder.com/167x250/415058/FFFFFF?text=${props.alt}`; // placeholder src to alternative image with name

        e.target.src = placeholderImage;
      }}
    />
  );
};

export default Image;
