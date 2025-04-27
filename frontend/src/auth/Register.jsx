import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  return (
    <>
      <div>Register</div>
      <div>
        <input
          type="text"
          placeholder="Enter your Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your Avatar link"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>
    </>
  );
};

export default Register;
