# نظرة عامة — Portfolio | Ahmed Hassan

> موقع Portfolio شخصي لـ **Ahmed Hassan** — مطوّر Full-Stack متخصص في منتجات SaaS وأنظمة الذكاء الاصطناعي.  
> الهدف: عرض الخبرة، المشاريع، طريقة العمل، والخدمات في تجربة واحدة احترافية وواضحة.

![معاينة كاملة للصفحة — Desktop](./screenshots/01-full-page-desktop.png)

---

## 1. ملخص المشروع

| البند | التفاصيل |
|-------|----------|
| **النوع** | Single-page portfolio |
| **الإطار** | Next.js 16 + React 19 + TypeScript |
| **الهوية** | Dark UI — أسود / فحمي / برتقالي |
| **الجمهور** | عملاء، شركات، فرق منتجات، فرص عمل |
| **اللغة** | English (محتوى الموقع) |

الموقع مبني كمنتج رقمي وليس مجرد CV: كل قسم له دور واضح في سرد قصة Ahmed كـ **Digital Product Builder**.

---

## 2. أهداف الموقع

1. **إظهار الخبرة** في Full-Stack و AI Products و RAG و Agents.
2. **بناء الثقة** عبر مشاريع حقيقية و workflow منظم.
3. **تحويل الزائر** إلى تواصل عبر نموذج Contact جاهز للإنتاج.
4. **التميز بصرياً** دون فقدان الوضوح أو الأداء.

---

## 3. هيكل الصفحة

```
Hero → About → Skills → Workflow → Projects → Services → Contact → Footer
```

| # | القسم | ID | الوظيفة |
|---|--------|-----|---------|
| 1 | Hero | `#home` | الانطباع الأول + CTA |
| 2 | About | `#about` | من هو Ahmed وما يميزه |
| 3 | Skills | `#skills` | Stack التقني |
| 4 | Workflow | `#workflow` | طريقة بناء المنتج (7 مراحل) |
| 5 | Projects | `#projects` | أعمال مختارة |
| 6 | Services | `#services` | الخدمات المقدمة |
| 7 | Contact | `#contact` | نموذج تواصل |
| 8 | Footer | — | روابط، سوشيال، newsletter |

---

## 4. جولة بصرية بالأقسام

### 4.1 Hero — الواجهة الرئيسية

القسم الأول يملأ الشاشة ويقدّم:
- الاسم والدور (Full-Stack AI Product Developer)
- حالة التوفر (Available for freelance)
- عنوان رئيسي قوي + وصف مختصر
- زر **Let's Work Together**
- 4 Capability links
- شريط Core Stack (TypeScript, React, Next.js, …)
- طبقة بصرية ثلاثية الأبعاد (Three.js) مع تدرجات برتقالية

![Hero — Desktop](./screenshots/02-hero-desktop.png)

![Hero — Mobile](./screenshots/10-hero-mobile.png)

---

### 4.2 About — الملف الشخصي

- Eyebrow: `ABOUT / PROFILE`
- عنوان: *More than a developer.*
- مبادئ العمل: Product-first · Scalable engineering · AI with real value
- **Terminal card** تفاعلية تحاكي CLI وتعرض بيانات Profile

![About — Desktop](./screenshots/03-about-desktop.png)

---

### 4.3 Skills — المهارات

المهارات مقسّمة إلى 4 مجموعات:

| المجموعة | أمثلة |
|----------|-------|
| Interface | React, Next.js, TypeScript, Tailwind, shadcn/ui |
| Systems | Node.js, NestJS, PostgreSQL, MongoDB, Redis |
| AI Products | RAG, LLM APIs, Vector Search, AI Agents, n8n |
| Delivery | Docker, CI/CD, Monitoring, Deployment |

![Skills — Desktop](./screenshots/04-skills-desktop.png)

---

### 4.4 Workflow — طريقة العمل

Workflow من **7 مراحل** من الفكرة إلى الإطلاق:

1. Discovery  
2. Product Scope  
3. UX/UI Design  
4. System Architecture *(المرحلة النشطة الافتراضية)*  
5. Frontend & Backend  
6. QA & Optimization  
7. Launch & Evolution  

- **Desktop:** خريطة تفاعلية (SVG pipeline)  
- **Mobile:** Timeline عمودي  
- تفاصيل كل مرحلة: وصف + deliverables + status

![Workflow — Desktop](./screenshots/05-workflow-desktop.png)

![Workflow — Mobile](./screenshots/11-workflow-mobile.png)

---

### 4.5 Projects — المشاريع

عرض شبكي لمشاريع مختارة:

| # | المشروع | التصنيف |
|---|---------|---------|
| 01 | Movie Atlas | Full-Stack Application |
| 02 | Simple RAG | AI Engineering |
| 03 | Pinterest MVP | Product Engineering |
| 04 | X Project | Full-Stack Architecture |

كل بطاقة تحتوي: رقم، eyebrow، وصف، category، capabilities، CTA.

![Projects — Desktop](./screenshots/06-projects-desktop.png)

![Projects — Mobile](./screenshots/12-projects-mobile.png)

---

### 4.6 Services — الخدمات

ست خدمات رئيسية:

1. SaaS Product Development  
2. AI & RAG Systems  
3. AI Agents & Automation  
4. Backend & API Architecture  
5. Frontend Product Interfaces  
6. Deployment & Production Engineering  

كل خدمة: عنوان، وصف، صورة artwork متجاوبة.

![Services — Desktop](./screenshots/07-services-desktop.png)

---

### 4.7 Contact — التواصل

- عنوان: *Have an idea worth building?*
- نموذج: Name · Email · Message  
- API: `POST /api/contact` → Nodemailer (Gmail)  
- Honeypot anti-spam + validation

![Contact — Desktop](./screenshots/08-contact-desktop.png)

---

### 4.8 Footer

- Brand + وصف مختصر  
- Navigation · Services · Social  
- Newsletter UI  
- Copyright + legal links

![Footer — Desktop](./screenshots/09-footer-desktop.png)

---

## 5. الهوية البصرية

| العنصر | القيمة / النمط |
|--------|----------------|
| الخلفية | `#111111` — `#090a0a` |
| السطح | `#292827` |
| النص | `#f4f0ea` warm white |
| Accent | `#ff6a3d` orange |
| Borders | `rgba(255,255,255,0.08)` |
| Glow | orange soft shadows |
| Typography | Inter + Newsreader italic + Roboto |
| Radius | cards ~1.5rem — panels ~2.6rem |

**مبدأ التصميم:** البرتقالي accent فقط — ليس كل العناصر. الأسود والفحمي يحملان المحتوى.

---

## 6. البنية التقنية

### Frontend
- Next.js App Router (RSC + Client Components حيث يلزم)
- Tailwind CSS 4 + CSS modules/tokens في `app/styles/`
- Motion layer: Reveal, Stagger, Parallax, Magnetic
- Three.js في Hero

### Backend
- Route Handler: `app/api/contact/route.ts`
- Nodemailer + Gmail App Password

### Content Architecture
```
content/
├── hero-content.ts
├── portfolio-content.ts    # about, skills, services, nav
├── projects-content.ts
├── workflow-content.ts
├── contact-content.ts
└── footer-content.ts
```

فصل المحتوى عن العرض يسهّل التحديث بدون لمس UI.

---

## 7. التجاوب (Responsive)

| Breakpoint | السلوك |
|------------|--------|
| Desktop ≥1440px | Grid كامل، workflow map، hero split |
| Tablet ~820px | أعمدة مبسّطة، padding أقل |
| Mobile ≤390px | Timeline، drawer nav، stacks عمودية |

لقطات Mobile متوفرة في `screenshots/10-*` و `11-*` و `12-*`.

---

## 8. إمكانية الوصول والحركة

- Semantic landmarks (`main`, `section`, `footer`)
- Keyboard focus visible على الروابط والأزرار
- `prefers-reduced-motion`: تقليل animations
- ARIA labels على workflow و navigation

---

## 9. متغيرات البيئة

```env
GMAIL_USER=
GMAIL_APP_PASSWORD=
CONTACT_EMAIL=
```

مطلوبة لتفعيل إرسال نموذج Contact.

---

## 10. أوامر التشغيل

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

---

## 11. ملفات اللقطات

| الملف | الوصف |
|-------|-------|
| `01-full-page-desktop.png` | الصفحة كاملة |
| `02-hero-desktop.png` | Hero |
| `03-about-desktop.png` | About |
| `04-skills-desktop.png` | Skills |
| `05-workflow-desktop.png` | Workflow |
| `06-projects-desktop.png` | Projects |
| `07-services-desktop.png` | Services |
| `08-contact-desktop.png` | Contact |
| `09-footer-desktop.png` | Footer |
| `10-hero-mobile.png` | Hero mobile |
| `11-workflow-mobile.png` | Workflow mobile |
| `12-projects-mobile.png` | Projects mobile |

> اللقطات مُلتقطة من build إنتاجي محلي (1440×900 desktop · 390×844 mobile).

---

## 12. التواصل

**Ahmed Hassan**  
Full-Stack AI Product Developer · Giza, Egypt

- GitHub: [AhmedHassanDev1](https://github.com/AhmedHassanDev1)
- LinkedIn: [Ahmed Hassan](https://www.linkedin.com/in/ahmed-hassan-02a006235/)
- Email: ahmedhassan.dev20@gmail.com
- Phone: +20 11 5413 8204

---

*آخر تحديث: أغسطس 2026*
