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
    await navigateTo("/");
  };

  const register = async (name: string, email: string, password: string) => {
    try {
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
      await navigateTo("/");
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  const resetPassword = async (
    current_password: string,
    new_password: string,
    email: string
  ) => {
    const match_req = await db.query_raw(
      `SELECT * FROM user WHERE email='${email}' AND crypto::argon2::compare(password, '${current_password}')`
    );
    if (!match_req[0].result) return;

    const match_res = match_req[0].result as User[];
    const matched = match_res.length > 0;

    if (!matched) return;

    await db.query_raw(
      `UPDATE user SET password=crypto::argon2::generate('${new_password}') WHERE email='${email}'`
    );
    await logout();
  };

  const logout = async () => {
    await db.invalidate();
    token.value = undefined;
    user.value = undefined;
    await navigateTo("/auth");
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
