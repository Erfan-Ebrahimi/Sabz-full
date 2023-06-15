
import "./Input.scss";

const Input = (props) => {

  const onChangeHandler = (e) => {
    console.log(e.target.value);
  }

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={props.className}
        onChange={onChangeHandler}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={props.className}
        onChange={onChangeHandler}
      />
    );

  return <div>{element}</div>;
}

export default Input;