export const Login = (): JSX.Element => {
  const loginUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input type="email" placeholder="Enter email" />
        <label>Password</label>
        <input type="password" placeholder="Enter password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
