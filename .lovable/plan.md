

## Update Browser Tab Icon (Favicon)

The "grey globe" you're seeing in the browser tab is the default favicon. We'll replace it with your StratixOS hexagonal logo so it shows your brand icon in browser tabs, Google search results, and bookmarks.

### What will change
- Copy your uploaded logo to the project's public folder
- Update the HTML to reference your logo as the site's favicon
- The new icon will appear in browser tabs and search results

### Technical details
1. Copy `user-uploads://StratixOS_logo_copy-2.png` to `public/favicon.png`
2. Update `index.html` to add a `<link rel="icon" href="/favicon.png" type="image/png">` tag in the `<head>`

