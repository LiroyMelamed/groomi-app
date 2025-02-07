export default function SimpleInput({ placeholder, type, value, onChange, maxLength, otherProps }) {

    function onValueInputed(e) {
        onChange?.(e.target.value)
    }

    return (
        <input
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onValueInputed}
            maxLength={maxLength}
            {...otherProps}
        />
    );
}