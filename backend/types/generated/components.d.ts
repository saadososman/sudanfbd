import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_sections';
  info: {
    description: 'Manifesto and identity content block';
    displayName: 'About Section';
    icon: 'book';
  };
  attributes: {
    bulletPoints: Schema.Attribute.JSON;
    compact: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    kicker: Schema.Attribute.String;
    paragraphs: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsContentTeaserSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_content_teaser_sections';
  info: {
    displayName: 'Content Teaser Section';
    icon: 'grid';
  };
  attributes: {
    contentType: Schema.Attribute.Enumeration<
      ['news', 'sectors', 'documents']
    > &
      Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    kicker: Schema.Attribute.String;
    limit: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    viewAllLabel: Schema.Attribute.String;
    viewAllPath: Schema.Attribute.String;
  };
}

export interface SectionsCtaBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banner_sections';
  info: {
    displayName: 'CTA Banner Section';
    icon: 'bell';
  };
  attributes: {
    body: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'shared.cta-link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFrameworkSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_framework_sections';
  info: {
    description: 'Strategic planning framework items grid';
    displayName: 'Framework Section';
    icon: 'grid';
  };
  attributes: {
    items: Schema.Attribute.JSON & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    description: 'Homepage hero banner with headline, CTAs, image, and insight badges';
    displayName: 'Hero Section';
    icon: 'picture';
  };
  attributes: {
    body: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    insightOne: Schema.Attribute.String;
    insightTwo: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<'shared.cta-link', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta-link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsMethodologySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_methodology_sections';
  info: {
    description: 'Work methodology cards and phases timeline';
    displayName: 'Methodology Section';
    icon: 'layer';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.text-card', true>;
    phases: Schema.Attribute.JSON;
    phasesTitle: Schema.Attribute.String;
  };
}

export interface SectionsMissionValuesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_mission_values_sections';
  info: {
    description: 'Mission statement with operating principles panel';
    displayName: 'Mission & Values Section';
    icon: 'heart';
  };
  attributes: {
    missionText: Schema.Attribute.Text & Schema.Attribute.Required;
    missionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    values: Schema.Attribute.JSON & Schema.Attribute.Required;
    valuesTitle: Schema.Attribute.String;
  };
}

export interface SectionsObjectivesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_objectives_sections';
  info: {
    description: 'Forum objectives with card grid';
    displayName: 'Objectives Section';
    icon: 'bullseye';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.text-card', true>;
    kicker: Schema.Attribute.String;
    paragraphs: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsRichContentSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_content_sections';
  info: {
    displayName: 'Rich Content Section';
    icon: 'file';
  };
  attributes: {
    body: Schema.Attribute.Blocks;
    bulletPoints: Schema.Attribute.JSON;
    cards: Schema.Attribute.Component<'shared.text-card', true>;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.JSON;
    kicker: Schema.Attribute.String;
    paragraphs: Schema.Attribute.JSON;
    phases: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats_sections';
  info: {
    description: 'Homepage statistics row with numeric values and labels';
    displayName: 'Stats Section';
    icon: 'chartCircle';
  };
  attributes: {
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
  };
}

export interface SharedCtaLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_links';
  info: {
    displayName: 'CTA Link';
    icon: 'cursor';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    path: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'light']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'Nav Item';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.String;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    path: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    platform: Schema.Attribute.Enumeration<
      ['x', 'facebook', 'linkedin', 'instagram', 'youtube', 'other']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    platform: Schema.Attribute.Enumeration<
      ['x', 'facebook', 'linkedin', 'instagram', 'youtube', 'other']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'Single statistic with a prominent value and descriptive label';
    displayName: 'Stat Item';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTextCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_cards';
  info: {
    displayName: 'Text Card';
    icon: 'layer';
  };
  attributes: {
    icon: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedUiLabels extends Struct.ComponentSchema {
  collectionName: 'components_shared_ui_labels';
  info: {
    description: 'Localized interface strings for search, buttons, and empty states';
    displayName: 'UI Labels';
  };
  attributes: {
    adminIntegrationBody: Schema.Attribute.Text;
    adminIntegrationTitle: Schema.Attribute.String;
    backToNews: Schema.Attribute.String;
    categoryEconomic: Schema.Attribute.String;
    categoryGovernance: Schema.Attribute.String;
    categoryInfrastructure: Schema.Attribute.String;
    categoryServices: Schema.Attribute.String;
    categorySocial: Schema.Attribute.String;
    download: Schema.Attribute.String;
    file: Schema.Attribute.String;
    formLocale: Schema.Attribute.String;
    formTitle: Schema.Attribute.String;
    newsLabel: Schema.Attribute.String;
    newsSearch: Schema.Attribute.String;
    noDocs: Schema.Attribute.String;
    noNews: Schema.Attribute.String;
    publish: Schema.Attribute.String;
    publishedOn: Schema.Attribute.String;
    readArticle: Schema.Attribute.String;
    readMore: Schema.Attribute.String;
    search: Schema.Attribute.String;
    sector: Schema.Attribute.String;
    sectorScopeKicker: Schema.Attribute.String;
    sectorScopeTitle: Schema.Attribute.String;
    sectorsEmpty: Schema.Attribute.String;
    sectorsSearch: Schema.Attribute.String;
    statusReady: Schema.Attribute.String;
    upload: Schema.Attribute.String;
    uploadDisabled: Schema.Attribute.String;
    uploadFailed: Schema.Attribute.String;
    uploading: Schema.Attribute.String;
    uploadSuccess: Schema.Attribute.String;
    viewSector: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.about-section': SectionsAboutSection;
      'sections.content-teaser-section': SectionsContentTeaserSection;
      'sections.cta-banner-section': SectionsCtaBannerSection;
      'sections.framework-section': SectionsFrameworkSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.methodology-section': SectionsMethodologySection;
      'sections.mission-values-section': SectionsMissionValuesSection;
      'sections.objectives-section': SectionsObjectivesSection;
      'sections.rich-content-section': SectionsRichContentSection;
      'sections.stats-section': SectionsStatsSection;
      'shared.cta-link': SharedCtaLink;
      'shared.nav-item': SharedNavItem;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.stat-item': SharedStatItem;
      'shared.text-card': SharedTextCard;
      'shared.ui-labels': SharedUiLabels;
    }
  }
}
