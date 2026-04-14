// app/api/chat/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  console.log("🔥 API ROUTE HIT - STREAMING MODE");

  // استفاده از endpoint استریم
  const response = await fetch("http://127.0.0.1:8000/chat/stream", {
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

  // برگردوندن استریم به کلاینت
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}