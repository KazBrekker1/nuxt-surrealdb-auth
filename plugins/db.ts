export default defineNuxtPlugin(async (nuxtApp) => {
    await connectDB();
    let cookie = useCookie("token")
    if (cookie.value) {
        await useAuth().loadUser(cookie.value)
    }
})
