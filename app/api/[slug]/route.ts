export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Fetch the initial data
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/` + params.slug
    );
    const data: any = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching API:", error);
    // Return an error response with status code 500
    return new Response("Error fetching API", { status: 500 });
  }
}
