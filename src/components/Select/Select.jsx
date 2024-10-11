import s from "./Select.module.css";

export const Select = ({ value, onChange, options }) => {
  const houses = Array.from(options);

  return (
    <div className={s.select}>
      <label htmlFor="select">School</label>
      <select
        className={s.select}
        name="select"
        id="select"
        value={value}
        onChange={onChange}
      >
        {" "}
        {houses.map((text, i) => (
          <option key={i} value={text}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};
