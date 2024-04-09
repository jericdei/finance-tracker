export default defineFormActions({
    default: async (event) => {
        const body = await readBody(event)

        return actionResponse(
            event,
            {
                foo: "bar",
            },
            {
                redirect: "/",
            },
        )
    },
})
