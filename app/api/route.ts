import { url } from "inspector";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get("offset");

  const url =
    "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=21";

  try {
    // Fetch the initial data
    const response = await fetch(url);
    const data: any = await response.json();

    // Extract the URLs from the initial data
    const urls: string[] = data?.results.map(
      (result: { url: string }) => result.url
    );

    // Fetch data from each URL concurrently
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const pokemonData = await Promise.all(responses.map((res) => res.json()));

    return new Response(JSON.stringify(pokemonData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching API:", error);
    // Return an error response with status code 500
    return new Response("Error fetching API", { status: 500 });
  }
}
