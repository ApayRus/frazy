export async function fetchRequest(url, method, authtoken, body) {
    const response = await fetch(url, {
        method,
        headers: { authtoken, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    return response.json()
}