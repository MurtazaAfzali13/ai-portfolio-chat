export async function POST(req: Request) {
  const body = await req.json();
    console.log("🔥 API ROUTE HIT");

  const res = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
   console.log(text)
  return Response.json({
    id: crypto.randomUUID(),
    role: "assistant",
    content: text,
  });
}