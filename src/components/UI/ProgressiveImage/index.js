import { useState } from "react";

import "./style.scss";

const ProgressiveImage = (props) => {
  const { alt, height, width, src } = props;
  const imageHeight = height || "250";
  const imageWidth = width || "167";
  const placeholderSrc = `https://via.placeholder.com/${imageWidth}x${imageHeight}/415058/FFFFFF?text=${alt}`; // placeholder src to alternative image with name
  const [imgSrc, setImgSrc] = useState(placeholderSrc);

  const customClass = imgSrc === placeholderSrc ? "img-loading" : "img-loaded";

  return (
    <>
      <img
        src={imgSrc}
        onLoad={() => setImgSrc(src)}
        alt={alt}
        onError={(e) => (e.target.src = placeholderSrc)}
        className={`${props.className} ${customClass}`}
        {...props}
      />
    </>
  );
};

export default ProgressiveImage;
