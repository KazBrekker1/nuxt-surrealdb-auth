import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
    });
    token.value = token_res;
    const user_res = await db.select("user");
    user.value = user_res[0] as any;
  };

  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    const auth_res = await signInWithPopup(auth, provider);

    let token_res: string;
    try {
      token_res = await db.signin({
        email: auth_res.user.email,
        password: auth_res.user.uid,
        scope: "google_user",
      });
    } catch (error) {
      token_res = await db.signup({
        scope: "google_user",
        name: auth_res.user.displayName,
        email: auth_res.user.email,
        google_id: auth_res.user.uid,
      });
    }

    if (!token_res) throw new Error("Failed to authenticate");

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
    await auth.signOut();
    user.value = undefined;
    token.value = undefined;
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
    googleSignin,
    loadUser,
  };
};
