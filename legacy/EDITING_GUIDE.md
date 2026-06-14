# Editing Guide — Nrityaswarupam Website

This guide is written for **non-technical editors**. You do **not** need to be a
programmer to make everyday changes like updating text, swapping a photo, adding a
class to the schedule, or changing contact details.

> Golden rule: change only the **text between the marks**, never the symbols
> like `<`, `>`, `"` or `class="..."`. If something looks scary, leave it alone.

---

## 1. The files you'll touch

| File | What's on it |
| --- | --- |
| `index.html` | The Home page |
| `schedule.html` | The weekly class timetable |
| `about.html` | About / philosophy / instructors |
| `gallery.html` | Photo gallery |
| `join.html` | The "Join / Enquiry" form and contact details |
| `images/` | Pictures used on the site (e.g. the logo) |

You can open any `.html` file in a plain text editor (or VS Code). Make your change,
save, then refresh the page in your browser to see it.

---

## 2. ⭐ FIRST-TIME SETUP: make the enquiry form work

Right now the "Send Enquiry" form looks ready but isn't connected, so no emails are
sent yet. Connecting it takes about **2 minutes** and is **free**.

1. Go to **https://web3forms.com**
2. Enter the email address where you want to **receive enquiries**, and click to get
   your **Access Key** (a long code like `a1b2c3d4-...`). Check your inbox to confirm.
3. Open **`join.html`** in a text editor.
4. Find this line (near the top of the form):

   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE" />
   ```

5. Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your key (keep the quote marks):

   ```html
   <input type="hidden" name="access_key" value="a1b2c3d4-your-real-key" />
   ```

6. Save the file. Done! Test it by filling in the form on the website — the message
   should arrive in your email inbox.

That's it. No server, no monthly bill (free up to 250 submissions/month).

---

## 3. Change the contact details

Open **`join.html`** and look for the "Visit the Studio" box. Change the text inside:

- **Address:** edit the words after `Address`.
- **Phone:** edit the number in **two** places — the visible text **and** in
  `href="tel:+910000000000"` (this makes it tappable on phones).
- **Email:** edit it in **two** places — the visible text **and** in
  `href="mailto:hello@nrityaswarupam.com"`.
- **Hours:** edit the days/times text.

---

## 4. Edit text anywhere

Find the words on the page you want to change and type over them. For example, to
change the home headline, open `index.html` and find:

```html
<h1 ...>Elevating Tradition <br /> <span ...>Through Movement</span></h1>
```

Change `Elevating Tradition` / `Through Movement` to your new words. Leave the
`<h1>`, `<br />`, `<span>` tags exactly as they are.

---

## 5. Add or edit a class in the schedule

Open **`schedule.html`**. Each class is a block that starts with a comment like
`<!-- Class Card 1 -->`. The easiest way to add a class is to **copy an existing
block** and edit it.

A class block begins with a line like this:

```html
<div data-class-card data-form="kathak" data-level="beginner" class="...">
```

- `data-form` must be one of: `kathak`, `bharatanatyam`, `odissi`, `kuchipudi`
  (lowercase). This is what the **Dance Form filter** uses.
- `data-level` must be one of: `beginner`, `intermediate`, `advanced` (lowercase).
  This is what the **Skill Level filter** uses.

Inside the block you can change the visible **class name**, the **time**, the
**duration**, the **instructor name**, and the **room**. Keep the `data-form` and
`data-level` values correct so the filters keep working.

> The filters on the schedule page work automatically — you don't need to touch any
> code for them. Just make sure every class has the right `data-form` and
> `data-level` values.

To add a brand-new **day**, copy a day heading block:

```html
<div class="lg:col-span-12 mt-md mb-sm flex items-center gap-4" data-day>
<h2 class="...">Tuesday</h2>
<div class="..."></div>
</div>
```

Change `Tuesday` to the new day, and keep the `data-day` attribute on the outer
`<div>` (the filters use it to hide empty days).

---

## 6. Swap a photo

Two kinds of images are used:

- **Local images** (in the `images/` folder), like the logo:
  ```html
  <img ... src="images/logo.png" />
  ```
  To replace one, put your new file in the `images/` folder and update the file name
  in `src="images/..."`. (Tip: keep the same name to avoid editing anything.)

- **Online images**, which have a long `src="https://..."` web address. To use your
  own photo instead, save it into the `images/` folder and change the `src` to
  `images/your-photo.jpg`.

Always keep the `alt="..."` description meaningful — it's read aloud by screen
readers and shown if an image fails to load.

---

## 7. The browser-tab icon (favicon) and logo

The logo file is `images/logo.png`. Replacing that one file updates the browser-tab
icon on every page and the big logo on the home page. Use a roughly square image for
best results. A **transparent PNG** will look cleanest if you later want the logo in
the top navigation bar.

---

## 8. Things to be careful with (ask a developer)

- Anything inside `assets/config.js` or `assets/styles.css` (colors, fonts, layout).
- The `class="..."` values on elements (these control the design).
- The `<script>` and `<link>` lines at the top of each page.

If you break a page, the safest fix is to undo your last change (Ctrl/Cmd + Z) and
save again.

---

## 9. Preview the site locally

Open `index.html` directly in a browser, or for clean links run this in the project
folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
