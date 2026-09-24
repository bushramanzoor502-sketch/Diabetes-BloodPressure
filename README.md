# Blood Sugar & Diabetes Diary — product website

Marketing site (single-page) plus a standalone privacy policy page, for the **Blood Sugar & Diabetes Diary** Android app
(`C:\github\BloodPressureAndDiabetesTracker`, package `com.my.diabetes.bloodpressure.tracker`).

No build step, no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080
# then open http://127.0.0.1:8080/
```

## Structure

`index.html` is the single-page site; `privacy.html` is a standalone page so the
Play Store has a dedicated policy URL. `index.html` sections:

| Anchor | Section |
|---|---|
| `#top` | Hero — headline, CTAs, stats, floating phone |
| `#features` | Nine feature cards, one per app module |
| `#screens` | Eight real device screenshots, four across |
| `#how` | Four-step "reading to report" walkthrough |
| `#ranges` | BP / sugar / heart-rate / BMI reference tables |
| `#privacy` | Privacy-by-design band (the teaser) |
| `#support` | Quick guides + permission table (`#permissions`) |
| `#faq` | FAQ and troubleshooting, merged |
| `#get` | Final download CTA |

The header nav is a scrollspy: the link for the section in view gets `aria-current="page"`.
A back-to-top button appears after 700px of scroll.

**Play Store:** point the listing's privacy policy field at `privacy.html`, and change
`PRIVACY_POLICY_URL` in the app's `Settings.kt` to the same URL — it is currently the
placeholder `https://www.google.com`.

## Design system

Colours are copied verbatim from the app so the site and the app read as one product.
Source of truth: `app/src/main/java/com/my/diabetes/bloodpressure/tracker/ui/theme/Color.kt` and the
private palette at the top of `DashboardScreen.kt`.

| Token | Hex | App origin |
|---|---|---|
| `--cream` | `#FBF3EA` | `DashBg` — app background |
| `--hero-wash` | `#F0F7DC` | Dashboard header gradient start |
| `--green` | `#4CAF50` | `DashGreen` — primary |
| `--green-dark` | `#43A047` | `DashGreenDark` |
| `--green-light` | `#6FCF7A` | `BpGradStart` |
| `--green-tint` | `#EAF6E5` | `ColGreenBg` — mini card background |
| `--green-border` | `#DCEBD7` | `MedicalBlueDivider` |
| `--ink` | `#1F2A33` | `DashTextDark` |
| `--ink-soft` | `#4B5563` | `BpUpdateLabel` |
| `--muted` | `#9CA3AF` | `DashTextGrey` |
| `--orange` / `--orange-bg` | `#F5A623` / `#FCEEDD` | Weight & BMI card |
| `--purple` / `--purple-bg` | `#7E57C2` / `#EFEAFB` | Blood Sugar card |
| `--blue` / `--blue-bg` | `#2196F3` / `#E6F1FB` | Water Reminder card |
| `--red` / `--red-bg` / `--red-ink` | `#E53935` / `#FDECEC` / `#C62828` | Heart Rate card |
| `--amber-pill` | `#FBE3B0` | Weather pill |

Typography is Inter (Google Fonts) at the same weight ramp the app's `Type.kt` uses
(400/500/600/700/800), with the app's tight negative letter-spacing on headings.

## Assets

Everything in `assets/img/` is taken from the app itself — no stock art.

- `assets/img/screens/` — eight screenshots captured from the running app on a Pixel 6a
  (all 1080x2400): `home`, `blood-pressure`, `blood-sugar`, `weight-bmi`, `add-record`,
  `step-counter`, `reports`, `guides`
- `assets/img/icons/` — product art from `app/src/main/res/drawable/` plus the
  launcher icon from `mipmap-xxxhdpi/`

To refresh a screenshot, drop a new PNG over the matching file in `assets/img/screens/`;
the CSS phone frame crops any portrait aspect ratio to the same box, so mixing devices
cannot knock the row out of alignment.

## Before going live

1. Replace the two `https://play.google.com/store/apps/developer?id=UtilEdge` CTAs with the
   app's own Play Store listing URL once it is published.
2. Add a real support email address in the privacy policy's contact section (currently routed
   through Play and the in-app *Rate Me* action).
3. Repoint `PRIVACY_POLICY_URL` in the app's `Settings.kt` from `https://www.google.com` to the
   hosted `privacy.html`.
4. Confirm the "Last updated" date on the privacy policy.
5. Make the `og:image` meta tag absolute once the domain is known (it is relative today).
