import s from "./Input.module.css";

export const Input = ({ value, onChange }) => {
  return (
    <div className={s.input}>
      <label htmlFor="name">Name</label>
      <input
        className={s.input}
        type="text"
        id="name"
        placeholder="Name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
