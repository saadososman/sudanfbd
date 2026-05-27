import type { CmsUiLabels } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

type TextCard = { title: string; text: string };

export type ContentFallback = {
  brand: string;
  shortBrand: string;
  brandSubtitle: string;
  footerNote: string;
  nav: {
    home: string;
    about: string;
    objectives: string;
    sectors: string;
    methodology: string;
    framework: string;
    news: string;
    documents: string;
    admin: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    sectorsCta: string;
    docsCta: string;
  };
  about: {
    title: string;
    intro: string;
    mission: string;
    missionText: string;
    values: string[];
  };
  manifesto: {
    title: string;
    kicker: string;
    paragraphs: string[];
    points: string[];
  };
  objectives: {
    title: string;
    kicker: string;
    paragraphs: string[];
    cards: TextCard[];
  };
  methodology: {
    title: string;
    intro: string;
    cards: TextCard[];
    phasesTitle: string;
    phases: string[];
  };
  framework: {
    title: string;
    intro: string;
    items: string[];
  };
  sectorsTitle: string;
  sectorsIntro: string;
  sectorsTeaserKicker: string;
  viewAllSectors: string;
  homeNewsKicker: string;
  newsTitle: string;
  newsIntro: string;
  viewAllNews: string;
  valuesTitle: string;
  ctaBannerTitle: string;
  ctaBannerBody: string;
  insightOne: string;
  insightTwo: string;
  ui: CmsUiLabels;
};

const CONTENT_FALLBACKS: Record<Locale, ContentFallback> = {
  ar: {
    brand: "الملتقى السوداني للبناء والتنمية",
    shortBrand: "الملتقى السوداني للبناء والتنمية",
    brandSubtitle: "بناء وتنمية",
    footerNote: "ألوان مستوحاة من علم السودان وهوية البناء المؤسسي.",
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
    about: {
      title: "عن الملتقى السوداني للبناء والتنمية",
      intro:
        "يعمل الملتقى السوداني للبناء والتنمية كمساحة تنسيق ومعرفة تجمع الخبراء والمؤسسات والمبادرات حول أولويات التعافي والبناء والتنمية المستدامة.",
      mission: "رسالتنا",
      missionText:
        "توفير منصة موثوقة لإنتاج المعرفة، ترتيب الأولويات، وربط أصحاب المصلحة بمشاريع قابلة للتنفيذ في السودان.",
      values: [
        "الشفافية وتبادل المعرفة",
        "الشراكة بين القطاع العام والخاص والمجتمع",
        "التخطيط المبني على البيانات",
        "خدمة الإنسان والمكان"
      ]
    },
    manifesto: {
      title: "ديباجة",
      kicker: "الهوية والرؤية الوطنية",
      paragraphs: [
        "ينبع هذا الملتقى من دافع وطني صادق، يسعى للإسهام في دعم مسار بناء الدولة السودانية خلال الفترة الانتقالية التي تعقب توقف الحرب، عبر عملية سياسية تفضي إلى سلطة مدنية تحمل شعارات ثورة ديسمبر في الحرية والسلام والعدالة، وتحوّلها إلى واقع ملموس من خلال جهود إعادة الإعمار والبناء والتنمية في مختلف القطاعات، بما يحقق الرفاه والاستقرار لكل السودانيين، ويعزز التنمية المتوازنة في جميع أنحاء البلاد، اعتمادًا على توظيف الخبرات العلمية والمهنية لأعضائه.",
        "يضم الملتقى مجموعة من الخبراء والمتخصصين من داخل السودان وخارجه، يمثلون تنوعًا واسعًا في التخصصات والتجارب، دون ارتباط تنظيمي ملزم بأي جهة سياسية أو حزبية أو نقابية، ودون أن يتبنى موقفًا سياسيًا محددًا.",
        "ويعمل كمنصة وطنية مهنية مستقلة، تركز على تقديم رؤى وبرامج عملية قابلة للتنفيذ، بما يخدم المصلحة العامة، ويدعم استقرار السودان، ويدفع مسار التنمية فيه بشكل واقعي ومدروس."
      ],
      points: [
        "منصة وطنية مهنية مستقلة",
        "خبرات سودانية من الداخل والخارج",
        "رؤى وبرامج عملية قابلة للتنفيذ"
      ]
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
      intro:
        "يعتمد الملتقى على منهجية عملية مرنة تجمع بين قرارات تنفيذية عاجلة للمئة يوم الأولى وخطط مرحلية تمتد حتى خمس سنوات، مع تنسيق مهني بين القطاعات.",
      cards: [
        {
          title: "قرارات تنفيذية للمئة يوم",
          text: "إعداد حزمة قرارات وتدخلات عاجلة للفترة الأولى بعد توقف الحرب، خاصة في الخدمات الأساسية والاستقرار اليومي."
        },
        {
          title: "خطط خمسية ومرحلية",
          text: "بناء خطط قصيرة ومتوسطة وطويلة المدى قابلة للتبني أو الاسترشاد بها وفق أولويات كل قطاع."
        },
        {
          title: "تعاون القطاعات",
          text: "تعمل القطاعات كورش متخصصة تنتج مخرجات مكتوبة، ثم ترفعها للمراجعة والتجميع ضمن وثيقة موحدة."
        },
        {
          title: "هيكل تنسيق مهني",
          text: "يتولى مكتب التنسيق العام الربط بين القطاعات، متابعة التقدم، توحيد النماذج، وضمان انسجام المخرجات دون التدخل الفني."
        }
      ],
      phasesTitle: "مراحل العمل",
      phases: [
        "التسجيل والفرز",
        "توزيع الأعضاء على القطاعات",
        "تشغيل الورش بنماذج موحدة",
        "تجميع ومراجعة المخرجات",
        "المتابعة والتحويل إلى مشاريع قابلة للتطبيق"
      ]
    },
    framework: {
      title: "إطار التخطيط الاستراتيجي",
      intro:
        "يوحد هذا الإطار شكل الخطط والبرامج داخل القطاعات، ويجعل المخرجات قابلة للقراءة والتنفيذ والمتابعة.",
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
    sectorsIntro:
      "القطاعات المقترحة في ميثاق تنظيم عمل الملتقى لإعداد قرارات تنفيذية وخطط قصيرة ومتوسطة المدى قابلة للتنفيذ.",
    sectorsTeaserKicker: "محاور العمل",
    viewAllSectors: "عرض كل القطاعات",
    homeNewsKicker: "آخر الأخبار",
    newsTitle: "الأخبار والمقالات",
    newsIntro: "آخر المقالات والتحديثات المنشورة من لوحة Strapi.",
    viewAllNews: "عرض كل الأخبار",
    valuesTitle: "مبادئ العمل",
    ctaBannerTitle: "الملتقى السوداني للبناء والتنمية",
    ctaBannerBody:
      "يوظف الخبرات السودانية داخل البلاد وخارجها لإنتاج سياسات وخطط قابلة للتنفيذ تخدم بناء الدولة السودانية الحديثة",
    insightOne: "بيانات ومؤشرات",
    insightTwo: "حوكمة وشراكات",
    ui: {
      search: "بحث",
      newsSearch: "ابحث في الأخبار",
      newsLabel: "مقال",
      noNews: "لا توجد مقالات منشورة بعد.",
      readArticle: "قراءة المقال",
      publishedOn: "نُشر في",
      backToNews: "العودة إلى الأخبار",
      readMore: "عرض التفاصيل",
      download: "تحميل PDF",
      noDocs: "لا توجد وثائق بعد.",
      upload: "رفع ملف",
      publish: "نشر",
      formTitle: "العنوان",
      sector: "القطاع",
      file: "ملف PDF",
      formLocale: "اللغة",
      statusReady: "جاهز للاتصال بواجهة Strapi.",
      sectorsSearch: "ابحث في القطاعات",
      sectorsEmpty: "لا توجد قطاعات منشورة حالياً من لوحة Strapi.",
      viewSector: "عرض القطاع",
      adminIntegrationTitle: "تكامل Strapi",
      adminIntegrationBody:
        "يتم الرفع عبر مسار Next.js المحمي /api/admin/documents باستخدام STRAPI_API_TOKEN على الخادم فقط. لا حاجة لصلاحيات create العامة في Strapi.",
      uploadDisabled: "الرفع غير مفعّل. أضف STRAPI_API_TOKEN في إعدادات الخادم.",
      uploading: "جاري الرفع...",
      uploadSuccess: "تم رفع الوثيقة بنجاح.",
      uploadFailed: "تعذر رفع الوثيقة. تحقق من Strapi والرمز المميز.",
      sectorScopeKicker: "اختصاصات ومجال عمل",
      sectorScopeTitle: "نطاق العمل",
      categoryEconomic: "الاقتصاد والإنتاج",
      categoryServices: "الخدمات الأساسية",
      categoryGovernance: "الحكم والمؤسسات",
      categoryInfrastructure: "البنية التحتية والتحول الرقمي",
      categorySocial: "المجتمع والسلام"
    }
  },
  en: {
    brand: "Sudanese Forum for Building and Development",
    shortBrand: "Sudanese Forum for Building and Development",
    brandSubtitle: "Building & Development",
    footerNote:
      "Colors inspired by Sudan's flag and institutional development identity.",
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
    about: {
      title: "About the Sudanese Forum for Building and Development",
      intro:
        "The Sudanese Forum for Building and Development is a coordination and knowledge space connecting experts, institutions, and initiatives around recovery, reconstruction, and sustainable development priorities.",
      mission: "Our Mission",
      missionText:
        "Provide a trusted platform for knowledge production, priority setting, and connecting stakeholders with practical projects across Sudan.",
      values: [
        "Transparency and knowledge sharing",
        "Public, private, and civic partnership",
        "Data-informed planning",
        "Service to people and place"
      ]
    },
    manifesto: {
      title: "Preamble",
      kicker: "Identity and national vision",
      paragraphs: [
        "This forum emerges from a sincere national commitment to contribute to the path of building the Sudanese state during the transitional period that follows the end of war, through a political process leading to civilian authority that carries the slogans of the December Revolution: freedom, peace, and justice. It seeks to turn these principles into tangible reality through reconstruction, building, and development across all sectors, achieving welfare and stability for all Sudanese people and strengthening balanced development throughout the country by mobilizing the scientific and professional expertise of its members.",
        "The forum brings together experts and specialists from inside Sudan and abroad, representing a wide range of disciplines and experiences, without binding organizational affiliation to any political, partisan, or union body, and without adopting a specific political position.",
        "It operates as an independent national professional platform focused on presenting practical, implementable visions and programs that serve the public interest, support Sudan's stability, and advance its development path in a realistic and well-studied manner."
      ],
      points: [
        "Independent national professional platform",
        "Sudanese expertise from inside the country and abroad",
        "Practical and implementable visions and programs"
      ]
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
      intro:
        "The forum uses a practical and flexible methodology that combines urgent 100-day executive decisions with phased plans extending up to five years, supported by professional coordination across sectors.",
      cards: [
        {
          title: "100-Day Executive Decisions",
          text: "Prepare urgent decisions and interventions for the first period after the end of war, especially in essential services and daily stability."
        },
        {
          title: "Five-Year and Phased Plans",
          text: "Build short-, medium-, and long-term plans that can be adopted or used as guidance according to each sector's priorities."
        },
        {
          title: "Sector Collaboration",
          text: "Sectors operate as specialized workshops producing written outputs, then submit them for review and integration into a unified document."
        },
        {
          title: "Professional Coordination Structure",
          text: "The General Coordination Office links sectors, tracks progress, unifies templates, and ensures coherence without interfering in technical content."
        }
      ],
      phasesTitle: "Work Phases",
      phases: [
        "Registration and sorting",
        "Assigning members to sectors",
        "Workshop operation using unified templates",
        "Output collection and review",
        "Follow-up and conversion into applicable projects"
      ]
    },
    framework: {
      title: "Strategic Planning Framework",
      intro:
        "This framework standardizes sector plans and programs, making outputs readable, implementable, and trackable.",
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
    sectorsIntro:
      "The proposed sectors in the forum charter for preparing executive decisions and short- to medium-term implementable plans.",
    sectorsTeaserKicker: "Workstreams",
    viewAllSectors: "View all sectors",
    homeNewsKicker: "Latest news",
    newsTitle: "News & Articles",
    newsIntro: "Latest articles and updates published from the Strapi admin panel.",
    viewAllNews: "View all news",
    valuesTitle: "Operating Principles",
    ctaBannerTitle: "Sudanese Forum for Building and Development",
    ctaBannerBody:
      "A national platform bringing together Sudanese expertise to prepare practical visions and plans that support reconstruction, development, and stability during the transitional period.",
    insightOne: "Data and indicators",
    insightTwo: "Governance and partnerships",
    ui: {
      search: "Search",
      newsSearch: "Search news",
      newsLabel: "Article",
      noNews: "No published articles yet.",
      readArticle: "Read article",
      publishedOn: "Published",
      backToNews: "Back to news",
      readMore: "View details",
      download: "Download PDF",
      noDocs: "No documents yet.",
      upload: "Upload file",
      publish: "Publish",
      formTitle: "Title",
      sector: "Sector",
      file: "PDF file",
      formLocale: "Language",
      statusReady: "Ready to connect to Strapi.",
      sectorsSearch: "Search sectors",
      sectorsEmpty: "No published sectors are available from Strapi yet.",
      viewSector: "View sector",
      adminIntegrationTitle: "Strapi Integration",
      adminIntegrationBody:
        "Uploads go through the protected Next.js route /api/admin/documents using STRAPI_API_TOKEN on the server only. Public create permissions on Strapi are not required.",
      uploadDisabled: "Upload disabled. Add STRAPI_API_TOKEN on the server.",
      uploading: "Uploading...",
      uploadSuccess: "Document uploaded successfully.",
      uploadFailed: "Upload failed. Check Strapi and the API token.",
      sectorScopeKicker: "Mandate and Scope",
      sectorScopeTitle: "Scope of Work",
      categoryEconomic: "Economy and Production",
      categoryServices: "Essential Services",
      categoryGovernance: "Governance and Institutions",
      categoryInfrastructure: "Infrastructure and Digital Transformation",
      categorySocial: "Society and Peace"
    }
  }
};

export function getContentFallback(locale: Locale): ContentFallback {
  return CONTENT_FALLBACKS[locale];
}
