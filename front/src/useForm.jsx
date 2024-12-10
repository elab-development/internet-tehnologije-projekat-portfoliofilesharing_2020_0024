import React from "react";

const useForm = (initialValues) => {
    const [formData, setFormData] = React.useState(initialValues);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return {
        formData,
        handleChange
    };
}

export default useForm;