//@auth.ts
export let SocialTypes;

(function (SocialTypes) {
  SocialTypes['HORIZONTAL'] = 'horizontal';
  SocialTypes['VERTICAL'] = 'vertical';
})(SocialTypes || (SocialTypes = {}));

export let AuthType;

(function (AuthType) {
  AuthType['JWT'] = 'jwt';
  AuthType['FIREBASE'] = 'firebase';
  AuthType['AWS'] = 'aws';
  AuthType['AUTH0'] = 'auth0';
  AuthType['SUPABASE'] = 'supabase';
})(AuthType || (AuthType = {}));

export let AuthRole;

(function (AuthRole) {
  AuthRole['ADMIN'] = 'admin';
  AuthRole['USER'] = 'user';
  AuthRole['CLIENTE'] = 'cliente';
  AuthRole['ANALISTA'] = 'analista';
})(AuthRole || (AuthRole = {}));

//@faq.ts
export let ListBadgeColors;

(function (ListBadgeColors) {
  ListBadgeColors['WHITE'] = 'white';
  ListBadgeColors['PRIMARY'] = 'primary';
})(ListBadgeColors || (ListBadgeColors = {}));

//@footer.ts
export let CopyrightType;

(function (CopyrightType) {
  CopyrightType['TYPE1'] = 'default';
  CopyrightType['TYPE2'] = 'type2';
  CopyrightType['TYPE3'] = 'type3';
})(CopyrightType || (CopyrightType = {}));

//@icon
export let IconType;

(function (IconType) {
  IconType['STROKE'] = 'stroke';
  IconType['FILL'] = 'fill';
  IconType['CUSTOM'] = 'custom';
})(IconType || (IconType = {}));

//@navbar.ts
export let MegaMenuType;

(function (MegaMenuType) {
  MegaMenuType['MEGAMENU1'] = 'megamenu-1';
  MegaMenuType['MEGAMENU2'] = 'megamenu-2';
  MegaMenuType['MEGAMENU3'] = 'megamenu-3';
  MegaMenuType['MEGAMENU4'] = 'megamenu-4';
  MegaMenuType['MEGAMENU5'] = 'megamenu-5';
})(MegaMenuType || (MegaMenuType = {}));

//@root.ts
export let DynamicComponentType;

(function (DynamicComponentType) {
  DynamicComponentType['ICON'] = 'icons';
  DynamicComponentType['IMAGE'] = 'images';
})(DynamicComponentType || (DynamicComponentType = {}));

// Added missing enums
export let AvatarSize;
(function (AvatarSize) {
    AvatarSize["BADGE"] = "badge";
    AvatarSize["XS"] = "xs";
    AvatarSize["SM"] = "sm";
    AvatarSize["MD"] = "md";
    AvatarSize["LG"] = "lg";
    AvatarSize["XL"] = "xl";
})(AvatarSize || (AvatarSize = {}));

export let ChipIconPosition;
(function (ChipIconPosition) {
    ChipIconPosition["LEFT"] = "left";
    ChipIconPosition["RIGHT"] = "right";
})(ChipIconPosition || (ChipIconPosition = {}));
