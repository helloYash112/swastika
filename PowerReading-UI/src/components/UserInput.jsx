import React from "react";
const UserInput = React.forwardRef(({ type, placeholder, icon }, ref) => (
    <div className="input-box">
        <span className="icon">{ icon}</span>
        <input type={type} placeholder={placeholder} ref={ref} />
    </div>
));

export default UserInput;