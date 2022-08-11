import "./style.scss";

const Chip = ({ type, name }) => {
  let chipColor = "primary";

  switch (type) {
    case "primary":
      chipColor = "chip-primary";
      break;

    case "error":
      chipColor = "chip-error";
      break;

    case "warning":
      chipColor = "chip-warning";
      break;

    case "success":
      chipColor = "chip-success";
      break;

    case "secondary":
      chipColor = "chip-secondary";
      break;

    case "dark":
      chipColor = "chip-dark";
      break;
  }

  return <div className={`chip ${chipColor}`}>{name}</div>;
};

export default Chip;
