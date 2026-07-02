import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    const now = new Date().toISOString()

    // Find all scheduled posts whose publish time has passed
    const { data: posts, error: fetchError } = await supabaseClient
      .from("blog_posts")
      .select("id, title, published_at")
      .eq("status", "scheduled")
      .lte("published_at", now)

    if (fetchError) throw fetchError

    if (!posts || posts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No posts to publish", published: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    // Publish each post
    const ids = posts.map((p) => p.id)
    const { error: updateError } = await supabaseClient
      .from("blog_posts")
      .update({ status: "published" })
      .in("id", ids)

    if (updateError) throw updateError

    const published = posts.map((p) => ({ id: p.id, title: p.title }))
    console.log(`Published ${posts.length} scheduled post(s):`, published)

    return new Response(
      JSON.stringify({
        message: `Published ${posts.length} post(s)`,
        published,
        timestamp: now,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
