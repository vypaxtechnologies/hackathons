import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'

/**
 * Environment bootstrap. Must be the first import in the process.
 *
 * Two problems this solves:
 *
 * 1. Ordering. ES module imports are hoisted and evaluated before the importing
 *    module's body runs, so a `dotenv.config()` call placed after the import
 *    list in server.js executed *after* every imported module had been
 *    evaluated. Modules that read `process.env` at their top level — such as
 *    emailService.js — silently saw an empty environment.
 *
 * 2. Working directory. `dotenv.config()` with no `path` reads `.env` relative
 *    to `process.cwd()`. Launching the server from the repository root instead
 *    of `server/` loaded the root `.env`, which does not define RESEND_API_KEY,
 *    EMAIL_FROM or EMAIL_TO. Email then reported itself unconfigured and every
 *    notification was silently dropped while the form still returned 201.
 *
 * The path is therefore resolved from this module's own location, so the server
 * reads the same file no matter where it was started from.
 */
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })

export default dotenv
