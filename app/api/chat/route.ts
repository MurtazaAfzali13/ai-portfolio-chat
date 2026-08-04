// 🔥 این خط برای ورسل بی‌نهایت مهم است!
// باعث می‌شود محدودیت زمانی ۱۰ ثانیه‌ای ورسل برای استریم‌ها برداشته شود
export const runtime = "edge"; 

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔥 API ROUTE HIT - STREAMING MODE");

    const response = await fetch(`${BASE_URL}/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // استخراج آخرین سوال کاربر
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

    // ارسال مستقیم استریم به فرانت‌اند
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform", // 👈 جلوگیری از کش شدن استریم
        "Connection": "keep-alive",
      },
    });
    
  } catch (error) {
    console.error("❌ API Route Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}