import './style.scss';

const MovieDetailSubSection = ({name, children}) => {
  return (
    <div className="movie-sub-section">
      {name}
      {children}
    </div>
  );
};

export default MovieDetailSubSection;
