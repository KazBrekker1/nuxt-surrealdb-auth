export const useAuth = () => {
  const user = useState<User | undefined>("user", () => undefined);
  const is_authenticated = computed(() => !!user.value);
  const token = useCookie("token", {
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: true,
  });

  const login = async (email: string, password: string) => {
    const token_res = await db.signin({
      email: email,
      password: password,
      scope: "user",
      database: "auth-test",
      namespace: "auth-test",
    });
    token.value = token_res;
    const user_res = await db.select("user");
    user.value = user_res[0] as any;
  };

  const register = async (name: string, email: string, password: string) => {
    const token_res = await db.signup({
      scope: "user",
      name: name,
      email: email,
      password: password,
      database: "auth-test",
      namespace: "auth-test",
    });
    token.value = token_res;
    const user_res = await db.select("user");
    user.value = user_res[0] as any;
  };

  const resetPassword = async (
    current_password: string,
    new_password: string,
    email: string
  ) => {
    const match_req = await db.query<User[][]>(
      "SELECT * FROM user WHERE email=$email AND crypto::argon2::compare(password, $current_password)",
      {
        email,
        current_password,
      }
    );

    const matched = match_req[0].length > 0;

    if (!matched) throw new Error("Invalid password");

    await db.query(
      "UPDATE user SET password=crypto::argon2::generate($new_password) WHERE email=$email",
      {
        email,
        new_password,
      }
    );
    await logout();
  };

  const logout = async () => {
    await db.invalidate();
    token.value = undefined;
    user.value = undefined;
    await navigateTo("/signin");
  };

  const loadUser = async (token: string) => {
    await db.authenticate(token);
    const user_res = await db.select("user");
    user.value = user_res[0] as any;
  };

  return {
    user,
    token,
    is_authenticated,
    register,
    login,
    logout,
    resetPassword,
    loadUser,
  };
};
