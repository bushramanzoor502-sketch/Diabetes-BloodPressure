# Health Mate — product website

Single-page marketing + legal site for the **Health Mate** Android app
(`C:\github\BloodPressureAndDiabetesTracker`, package `com.example.bloodpressure`).

No build step, no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080
# then open http://127.0.0.1:8080/
```

## Structure

Everything lives in one file — `index.html` — as anchored sections:

| Anchor | Section |
|---|---|
| `#top` | Hero — headline, CTAs, stats, floating phone |
| `#features` | Nine feature cards, one per app module |
| `#screens` | Horizontal rail of real device screenshots |
| `#how` | Four-step "reading to report" walkthrough |
| `#ranges` | BP / sugar / heart-rate / BMI reference tables |
| `#privacy` | Privacy-by-design band (the teaser) |
| `#support` | Quick guides + permission table (`#permissions`) |
| `#faq` | FAQ and troubleshooting, merged |
| `#privacy-policy` | Full privacy policy, 12 numbered parts (`#pp-summary` … `#pp-contact`) plus `#disclaimer` |
| `#get` | Final download CTA |

The header nav is a scrollspy: the link for the section in view gets `aria-current="page"`.
A back-to-top button appears after 700px of scroll.

> **Play Store note:** Google asks for a privacy policy URL. An anchor URL
> (`https://your-domain/#privacy-policy`) usually passes, but if a reviewer rejects it,
> split section 10 back out into its own `privacy.html` — the markup is self-contained
> inside `<section id="privacy-policy">` and lifts out cleanly.

## Design system

Colours are copied verbatim from the app so the site and the app read as one product.
Source of truth: `app/src/main/java/com/example/bloodpressure/ui/theme/Color.kt` and the
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

- `assets/img/screens/` — real device screenshots from `<app>/scratchpad/`:
  `home.png`, `blood-pressure.png`, `step-counter.png`, `weight-bmi.png`, `edit-reading.png`
- `assets/img/icons/` — product art from `app/src/main/res/drawable/` plus the
  launcher icon from `mipmap-xxxhdpi/`

To refresh a screenshot, drop a new PNG over the matching file in `assets/img/screens/`;
the CSS phone frame handles any portrait aspect ratio.

## Before going live

1. Replace the two `https://play.google.com/store/apps/developer?id=UtilEdge` CTAs with the
   app's own Play Store listing URL once it is published.
2. Add a real support email address in the `#privacy-policy` contact part (currently routed
   through Play and the in-app *Rate Me* action).
3. Confirm the "Last updated" date on the privacy policy.
4. Make the `og:image` meta tag absolute once the domain is known (it is relative today).
