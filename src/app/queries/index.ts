"server-only";

export async function getMovies () {
    try {
        const req = await fetch("https://api.kinopoisk.dev/v1.4/movie?limit=40",{
            headers: {
                "Content-Type" : "application/json",
                "X-API-KEY" : "FY5NHGR-ZWT4YWE-NB810Q0-K07ZAW3"
            }
        });
        const res = await req.json();
        return res        
    } catch (error) {
        return error
    }
}
