export default function SimpleCheckBox({id, handleCheckChieldElement, isChecked, value}) {
  return (
    <li>
    <input
        key={id}
        onClick={handleCheckChieldElement}
        type="checkbox"
        checked={isChecked}
        value={value}
    />{" "}
    {value}
    </li>
  );
}