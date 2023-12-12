import PropTypes from "prop-types";

function Button(props) {
  return (
    <button
      type="submit"
      className={
        "mt-4 text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary " +
        props.class
      }
      onClick={props.onClick}
    >
      {props.title}
    </button>
    // <Button title={} className={}/>
  );
}

Button.propTypes = {
  class: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
