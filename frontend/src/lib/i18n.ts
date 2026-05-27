export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const dictionary = {
  ar: {
    dir: "rtl",
    langName: "العربية",
    brand: "الملتقى السوداني للبناء والتنمية",
    shortBrand: "الملتقى السوداني للبناء والتنمية",
    nav: {
      home: "الرئيسية",
      about: "عن الملتقى",
      objectives: "الأهداف",
      sectors: "القطاعات",
      methodology: "منهجية العمل",
      framework: "إطار التخطيط",
      news: "الأخبار",
      documents: "المكتبة",
      admin: "الإدارة"
    },
    hero: {
      eyebrow: "منصة وطنية للتنمية",
      title: "الملتقى السوداني للبناء والتنمية",
      body: "موقع معرفي ومؤسسي يدعم التخطيط، الشراكات، ونشر الوثائق التنموية عبر قطاعات السودان الحيوية.",
      sectorsCta: "استعرض القطاعات",
      docsCta: "المكتبة الرقمية"
    },
    stats: ["25 قطاعا", "لغتان", "مكتبة PDF", "لوحة إدارة"],
    about: {
      title: "عن الملتقى السوداني للبناء والتنمية",
      intro: "يعمل الملتقى السوداني للبناء والتنمية كمساحة تنسيق ومعرفة تجمع الخبراء والمؤسسات والمبادرات حول أولويات التعافي والبناء والتنمية المستدامة.",
      mission: "رسالتنا",
      missionText: "توفير منصة موثوقة لإنتاج المعرفة، ترتيب الأولويات، وربط أصحاب المصلحة بمشاريع قابلة للتنفيذ في السودان.",
      values: ["الشفافية وتبادل المعرفة", "الشراكة بين القطاع العام والخاص والمجتمع", "التخطيط المبني على البيانات", "خدمة الإنسان والمكان"]
    },
    manifesto: {
      title: "ديباجة",
      kicker: "الهوية والرؤية الوطنية",
      paragraphs: [
        "ينبع هذا الملتقى من دافع وطني صادق، يسعى للإسهام في دعم مسار بناء الدولة السودانية خلال الفترة الانتقالية التي تعقب توقف الحرب، عبر عملية سياسية تفضي إلى سلطة مدنية تحمل شعارات ثورة ديسمبر في الحرية والسلام والعدالة، وتحوّلها إلى واقع ملموس من خلال جهود إعادة الإعمار والبناء والتنمية في مختلف القطاعات، بما يحقق الرفاه والاستقرار لكل السودانيين، ويعزز التنمية المتوازنة في جميع أنحاء البلاد، اعتمادًا على توظيف الخبرات العلمية والمهنية لأعضائه.",
        "يضم الملتقى مجموعة من الخبراء والمتخصصين من داخل السودان وخارجه، يمثلون تنوعًا واسعًا في التخصصات والتجارب، دون ارتباط تنظيمي ملزم بأي جهة سياسية أو حزبية أو نقابية، ودون أن يتبنى موقفًا سياسيًا محددًا.",
        "ويعمل كمنصة وطنية مهنية مستقلة، تركز على تقديم رؤى وبرامج عملية قابلة للتنفيذ، بما يخدم المصلحة العامة، ويدعم استقرار السودان، ويدفع مسار التنمية فيه بشكل واقعي ومدروس."
      ],
      points: ["منصة وطنية مهنية مستقلة", "خبرات سودانية من الداخل والخارج", "رؤى وبرامج عملية قابلة للتنفيذ"]
    },
    objectives: {
      title: "أهداف الملتقى",
      kicker: "غاية عملية ومخرجات قابلة للتنفيذ",
      paragraphs: [
        "ينطلق الملتقى من غاية عملية تتمثل في إعداد رؤى وبرامج وسياسات قابلة للتنفيذ، تدعم عمل الحكومة الانتقالية في مختلف القطاعات. ويعتمد في ذلك على توظيف خبرات الكوادر الوطنية داخل السودان وخارجه، وتحويل هذا التراكم المعرفي إلى مخرجات واضحة يمكن الاستفادة منها مباشرة.",
        "كما يسعى الملتقى إلى تقديم حلول واقعية للتحديات التي تواجه البلاد في هذه المرحلة، مع تطوير نماذج لخطط تنفيذية يمكن تبنيها أو الاسترشاد بها. وفي ذات السياق، يهدف إلى الإسهام في بناء مؤسسات الدولة على أسس مهنية وعلمية، وتعزيز العمل الجماعي المنظم بين الخبراء لخدمة القضايا الوطنية."
      ],
      cards: [
        {
          title: "رؤى وبرامج قابلة للتنفيذ",
          text: "إعداد سياسات وبرامج عملية تدعم الحكومة الانتقالية في مختلف القطاعات."
        },
        {
          title: "توظيف الخبرات الوطنية",
          text: "ربط الكوادر السودانية داخل البلاد وخارجها بمخرجات معرفية مباشرة الأثر."
        },
        {
          title: "حلول واقعية للتحديات",
          text: "تطوير نماذج تنفيذية قابلة للتبني أو الاسترشاد بها خلال المرحلة الانتقالية."
        },
        {
          title: "بناء مؤسسات مهنية",
          text: "الإسهام في ترسيخ أسس علمية ومهنية وتعزيز العمل الجماعي المنظم."
        }
      ]
    },
    methodology: {
      title: "منهجية عمل الملتقى",
      intro: "يعتمد الملتقى على منهجية عملية مرنة تجمع بين قرارات تنفيذية عاجلة للمئة يوم الأولى وخطط مرحلية تمتد حتى خمس سنوات، مع تنسيق مهني بين القطاعات.",
      cards: [
        { title: "قرارات تنفيذية للمئة يوم", text: "إعداد حزمة قرارات وتدخلات عاجلة للفترة الأولى بعد توقف الحرب، خاصة في الخدمات الأساسية والاستقرار اليومي." },
        { title: "خطط خمسية ومرحلية", text: "بناء خطط قصيرة ومتوسطة وطويلة المدى قابلة للتبني أو الاسترشاد بها وفق أولويات كل قطاع." },
        { title: "تعاون القطاعات", text: "تعمل القطاعات كورش متخصصة تنتج مخرجات مكتوبة، ثم ترفعها للمراجعة والتجميع ضمن وثيقة موحدة." },
        { title: "هيكل تنسيق مهني", text: "يتولى مكتب التنسيق العام الربط بين القطاعات، متابعة التقدم، توحيد النماذج، وضمان انسجام المخرجات دون التدخل الفني." }
      ],
      phasesTitle: "مراحل العمل",
      phases: ["التسجيل والفرز", "توزيع الأعضاء على القطاعات", "تشغيل الورش بنماذج موحدة", "تجميع ومراجعة المخرجات", "المتابعة والتحويل إلى مشاريع قابلة للتطبيق"]
    },
    framework: {
      title: "إطار التخطيط الاستراتيجي",
      intro: "يوحد هذا الإطار شكل الخطط والبرامج داخل القطاعات، ويجعل المخرجات قابلة للقراءة والتنفيذ والمتابعة.",
      items: [
        "مقدمة",
        "الأهداف",
        "آليات التنفيذ",
        "الجهات المسؤولة",
        "الإطار الزمني",
        "مؤشرات الأداء",
        "المخاطر",
        "طرق تخفيف المخاطر",
        "المخرجات المتوقعة",
        "مصادر التمويل"
      ]
    },
    sectorsTitle: "قطاعات العمل حسب الميثاق",
    sectorsIntro: "القطاعات المقترحة في ميثاق تنظيم عمل الملتقى لإعداد قرارات تنفيذية وخطط قصيرة ومتوسطة المدى قابلة للتنفيذ.",
    sectorsSearch: "ابحث في المكاتب والقطاعات",
    allSectors: "الكل",
    governanceOffices: "المكاتب المؤسسية",
    technicalSectors: "القطاعات المتخصصة",
    documentsTitle: "مكتبة الوثائق",
    documentsIntro: "ارفع وحمل ملفات PDF الخاصة بالتقارير، السياسات، الدراسات، وخطط العمل.",
    newsTitle: "الأخبار والمقالات",
    newsIntro: "آخر المقالات والتحديثات المنشورة من لوحة Strapi.",
    newsSearch: "ابحث في الأخبار",
    newsLabel: "مقال",
    noNews: "لا توجد مقالات منشورة بعد.",
    readArticle: "قراءة المقال",
    publishedOn: "نُشر في",
    backToNews: "العودة إلى الأخبار",
    adminTitle: "لوحة الإدارة",
    adminIntro: "إدارة الوثائق المنشورة وربطها بالقطاعات عبر واجهة Strapi.",
    readMore: "عرض التفاصيل",
    download: "تحميل PDF",
    search: "بحث",
    upload: "رفع ملف",
    title: "العنوان",
    sector: "القطاع",
    file: "ملف PDF",
    publish: "نشر",
    noDocs: "لا توجد وثائق بعد.",
    statusReady: "جاهز للاتصال بواجهة Strapi."
  },
  en: {
    dir: "ltr",
    langName: "English",
    brand: "Sudanese Forum for Building and Development",
    shortBrand: "Sudanese Forum for Building and Development",
    nav: {
      home: "Home",
      about: "About",
      objectives: "Objectives",
      sectors: "Sectors",
      methodology: "Methodology",
      framework: "Planning Framework",
      news: "News",
      documents: "Library",
      admin: "Admin"
    },
    hero: {
      eyebrow: "National development platform",
      title: "Sudanese Forum for Building and Development",
      body: "An institutional knowledge platform for planning, partnerships, and development publications across Sudan's priority sectors.",
      sectorsCta: "Explore sectors",
      docsCta: "Digital library"
    },
    stats: ["25 sectors", "Two languages", "PDF library", "Admin dashboard"],
    about: {
      title: "About the Sudanese Forum for Building and Development",
      intro: "The Sudanese Forum for Building and Development is a coordination and knowledge space connecting experts, institutions, and initiatives around recovery, reconstruction, and sustainable development priorities.",
      mission: "Our Mission",
      missionText: "Provide a trusted platform for knowledge production, priority setting, and connecting stakeholders with practical projects across Sudan.",
      values: ["Transparency and knowledge sharing", "Public, private, and civic partnership", "Data-informed planning", "Service to people and place"]
    },
    manifesto: {
      title: "Preamble",
      kicker: "Identity and national vision",
      paragraphs: [
        "This forum emerges from a sincere national commitment to contribute to the path of building the Sudanese state during the transitional period that follows the end of war, through a political process leading to civilian authority that carries the slogans of the December Revolution: freedom, peace, and justice. It seeks to turn these principles into tangible reality through reconstruction, building, and development across all sectors, achieving welfare and stability for all Sudanese people and strengthening balanced development throughout the country by mobilizing the scientific and professional expertise of its members.",
        "The forum brings together experts and specialists from inside Sudan and abroad, representing a wide range of disciplines and experiences, without binding organizational affiliation to any political, partisan, or union body, and without adopting a specific political position.",
        "It operates as an independent national professional platform focused on presenting practical, implementable visions and programs that serve the public interest, support Sudan's stability, and advance its development path in a realistic and well-studied manner."
      ],
      points: ["Independent national professional platform", "Sudanese expertise from inside the country and abroad", "Practical and implementable visions and programs"]
    },
    objectives: {
      title: "Forum Objectives",
      kicker: "Practical purpose and implementable outputs",
      paragraphs: [
        "The forum is driven by a practical purpose: preparing implementable visions, programs, and policies that support the work of the transitional government across different sectors. It does so by mobilizing the expertise of national professionals inside Sudan and abroad, and by transforming this accumulated knowledge into clear outputs that can be used directly.",
        "The forum also seeks to present realistic solutions to the challenges facing the country at this stage, while developing models for implementation plans that can be adopted or used as guidance. In the same context, it aims to contribute to building state institutions on professional and scientific foundations, and to strengthen organized collective work among experts in service of national issues."
      ],
      cards: [
        {
          title: "Implementable Visions and Programs",
          text: "Prepare practical policies and programs that support the transitional government across sectors."
        },
        {
          title: "Mobilizing National Expertise",
          text: "Connect Sudanese professionals inside the country and abroad to clear knowledge outputs."
        },
        {
          title: "Realistic Solutions",
          text: "Develop implementation models that can be adopted or used as guidance during transition."
        },
        {
          title: "Professional Institutions",
          text: "Support scientific foundations for state institutions and organized expert collaboration."
        }
      ]
    },
    methodology: {
      title: "Work Methodology",
      intro: "The forum uses a practical and flexible methodology that combines urgent 100-day executive decisions with phased plans extending up to five years, supported by professional coordination across sectors.",
      cards: [
        { title: "100-Day Executive Decisions", text: "Prepare urgent decisions and interventions for the first period after the end of war, especially in essential services and daily stability." },
        { title: "Five-Year and Phased Plans", text: "Build short-, medium-, and long-term plans that can be adopted or used as guidance according to each sector’s priorities." },
        { title: "Sector Collaboration", text: "Sectors operate as specialized workshops producing written outputs, then submit them for review and integration into a unified document." },
        { title: "Professional Coordination Structure", text: "The General Coordination Office links sectors, tracks progress, unifies templates, and ensures coherence without interfering in technical content." }
      ],
      phasesTitle: "Work Phases",
      phases: ["Registration and sorting", "Assigning members to sectors", "Workshop operation using unified templates", "Output collection and review", "Follow-up and conversion into applicable projects"]
    },
    framework: {
      title: "Strategic Planning Framework",
      intro: "This framework standardizes sector plans and programs, making outputs readable, implementable, and trackable.",
      items: [
        "Introduction",
        "Objectives",
        "Implementation mechanisms",
        "Responsible entities",
        "Timeline",
        "KPIs",
        "Risks",
        "Risk mitigation",
        "Expected outputs",
        "Funding sources"
      ]
    },
    sectorsTitle: "Charter Work Sectors",
    sectorsIntro: "The proposed sectors in the forum charter for preparing executive decisions and short- to medium-term implementable plans.",
    sectorsSearch: "Search offices and sectors",
    allSectors: "All",
    governanceOffices: "Institutional offices",
    technicalSectors: "Specialized sectors",
    documentsTitle: "Document Library",
    documentsIntro: "Upload and download PDF reports, policies, studies, and work plans.",
    newsTitle: "News & Articles",
    newsIntro: "Latest articles and updates published from the Strapi admin panel.",
    newsSearch: "Search news",
    newsLabel: "Article",
    noNews: "No published articles yet.",
    readArticle: "Read article",
    publishedOn: "Published",
    backToNews: "Back to news",
    adminTitle: "Admin Dashboard",
    adminIntro: "Manage published documents and connect them to sectors through the Strapi API.",
    readMore: "View details",
    download: "Download PDF",
    search: "Search",
    upload: "Upload file",
    title: "Title",
    sector: "Sector",
    file: "PDF file",
    publish: "Publish",
    noDocs: "No documents yet.",
    statusReady: "Ready to connect to Strapi."
  }
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function otherLocale(locale: Locale) {
  return locale === "ar" ? "en" : "ar";
}
