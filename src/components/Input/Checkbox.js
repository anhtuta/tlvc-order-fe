import React from 'react';
import './Checkbox.scss';

const Checkbox = (props) => {
  const { text, name, className = '', checked = false, disabled = false } = props;
  const classes = `cb ${className}`;

  const onChange = (e) => {
    props.onChange(e.target.name, e.target.checked);
  };

  return (
    <div className={classes}>
      <label className="custom-cb-container">
        {text}
        <input
          type="checkbox"
          name={name}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

// Note: HTML thì ko cần onChange, nếu click vào checkbox thì nó tự thay đổi
// (chuyển từ chưa check sang check và ngược lại). Nhưng với React thì ko có
// thì lúc click sẽ ko thay đổi gì!
export default Checkbox;
