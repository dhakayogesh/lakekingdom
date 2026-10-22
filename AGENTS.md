<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All hotel content (contact, rooms, images, experiences, gallery, testimonials) lives in src/data/site.ts; pages read from it so content edits never touch layout.
- Booking is enquiry-only via src/lib/enquiry.ts (WhatsApp/email hand-off); swap that module or set bookingEngineUrl to integrate a booking engine.
- Styling uses semantic tokens and @utility classes (btn-*, field, eyebrow) in src/styles.css.
