// send_contact function retired - contact via WhatsApp
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

serve(() => {
  const body = JSON.stringify({
    error: "send_contact function removed",
    message: "This endpoint has been retired. Please contact via WhatsApp: 0203252249",
  });
  return new Response(body, { status: 410, headers: { "Content-Type": "application/json" } });
});
