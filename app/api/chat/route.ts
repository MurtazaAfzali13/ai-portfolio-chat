const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("🔥 API ROUTE HIT - STREAMING MODE");

  const response = await fetch(`${BASE_URL}/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: body.messages[body.messages.length - 1].content,
      model: body.model,
      webSearch: body.webSearch,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Backend Error:", errorText);
    return new Response(errorText, { status: response.status });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}