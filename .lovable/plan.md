

## Update "Services" Nav Link Target

The "Services" link in the navbar currently points to `#services`, but the user wants it to scroll to the "Popular Agents" section instead.

### Changes

**`src/components/Navbar.tsx`**
- Change the `href` for "Services" from `#services` to `#popular-agents` (which is the existing `id` on the AgentShowcaseSection)

That single line change will make clicking "Services" scroll directly to the Popular Agents showcase.

