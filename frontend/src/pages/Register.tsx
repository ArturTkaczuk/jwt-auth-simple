export const Register = (): JSX.Element => {
  const registerUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type="text" placeholder="Enter name" />
        <label>Email</label>
        <input type="email" placeholder="Enter email" />
        <label>Password</label>
        <input type="password" placeholder="Enter password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
