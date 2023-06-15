import { useState, useRef ,useEffect} from "react";
import styles from "./styles.module.scss";

const Select = ({ label, options, handleInputState, placeholder, ...rest }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = ({ currentTarget: input }) => {
    const selectedValue = input.value;
    const isOptionSelected = selectedOptions.includes(selectedValue);
  
    let updatedOptions;
    if (isOptionSelected) {
      updatedOptions = selectedOptions.filter(
        (option) => option !== selectedValue
      );
    } else {
      updatedOptions = [...selectedOptions, selectedValue];
    }
  
    setSelectedOptions(updatedOptions);
    handleInputState(input.name, updatedOptions);
  };
  

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Build the placeholder text based on selected options
  let updatedPlaceholder = placeholder;
  if (selectedOptions.length > 0) {
    const selectedNames = selectedOptions.map((option) =>
      options.find((o) => o.value === option).name
    );
    updatedPlaceholder = selectedNames.join(", ");
  }

  return (
    <div className={styles.container} ref={selectRef}>
      <p className={styles.label}>{label}</p>
      <div
        className={`${styles.select} ${isOpen ? styles.open : ""}`}
        onClick={toggleDropdown}
      >
        <div className={styles.placeholder}>{updatedPlaceholder}</div>
        {isOpen && (
          <div className={styles.options}>
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  selectedOptions.includes(option.value) ? styles.selected : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange({ currentTarget: { value: option.value } });
                }}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedOptions.length > 0 && (
        <div className={styles.selectedOptions}>
        </div>
      )}
    </div>
  );
};

export default Select;
