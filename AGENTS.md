# AiDiTi publishing

Production is https://aiditi.art/. Cloudflare Worker `aiditi` is already connected to this GitHub repository's `main` branch, with automatic builds enabled. Wrangler runs `node build.mjs` before deployment. No local Mac or dashboard upload is required for routine publication.

## One complete release

- Read the newest main commit before editing and preserve concurrent work.
- Prepare and review all requested files together. When publication is authorized, publish the entire change in ONE commit and ONE main-branch update. With the GitHub connector, create blobs, one tree and one commit, then update main once using the expected head SHA.
- Never publish a multi-file change as separate commits per file. Overlapping Cloudflare builds can finish out of order and an older build can replace a newer one.
- Do not push another production update while the preceding release is still building. Preview-only work belongs on a separate branch and must not update main.
- Run the build and relevant JavaScript syntax checks. Check affected content and language switching; inspect mobile at 320, 390 and 430px for layout changes.
- After publication, fetch `/deployment.json` with a unique query parameter and compare its `commit` with the exact approved main commit. Also verify the public page and changed assets. A GitHub save or successful older build alone does not prove the latest update is live.
- If the release differs, inspect Cloudflare's active deployment and retry the build for the correct commit. Do not report success until the public release identity matches.
- Keep email, original attachments, credentials and work files outside the deployable asset set. Preserve DNS, mail, approved artwork, multilingual content and existing interactions unless the user requests changes.

## Phone workflow

The user can request edits and approve publication from a phone in a chat with access to `manitoulinmedia/aiditi`. Use the connected GitHub tools for one atomic update; Cloudflare publishes it in the cloud. Verify the result on the public domain and report the live link. Do not require the user's Mac or assume that every chat has GitHub write access.
