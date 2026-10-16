// @generated-by Antigravity - Authorized AI: Antigravity Only

import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;
let supabaseAdminClient = null;

/**
 * Initializes shared Supabase clients and decorates Fastify
 * Separates anonymous client from service role key client as mandated by security directives
 */
export function initSupabase(app) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && anonKey) {
    supabaseClient = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false }
    });

    if (serviceRoleKey) {
      supabaseAdminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false }
      });
    }

    if (app) {
      app.decorate('supabase', supabaseClient);
      if (supabaseAdminClient) {
        app.decorate('supabaseAdmin', supabaseAdminClient);
      }
      app.log.info('Supabase client successfully initialized and decorated on Fastify.');
    }
  } else {
    if (app) {
      app.log.info('Supabase credentials (SUPABASE_URL, SUPABASE_ANON_KEY) not provided. Supabase SDK initialization deferred.');
    }
  }

  return { supabase: supabaseClient, supabaseAdmin: supabaseAdminClient };
}

export function getSupabase() {
  return supabaseClient;
}

export function getSupabaseAdmin() {
  return supabaseAdminClient;
}
