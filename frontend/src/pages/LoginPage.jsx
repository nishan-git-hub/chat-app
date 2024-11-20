import { useState } from "react";

import toast from "react-hot-toast";

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid Email Format`");
      return false;
    }
    if (password.length < 6) {
      toast.error("Form must be atleast 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      login(formData);
    }
  };

  return <div>LoginPage</div>;
};

export default LoginPage;
