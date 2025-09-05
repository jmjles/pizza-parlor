export const wrongCredentialsError = () =>
    new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 400,
    })

export const serverError = () =>
    new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 })

export const userNotFoundError = () =>
    new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })

export const failedToCreateUserError = () =>
    new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
    })

export const authError = () =>
    new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 400,
    })
