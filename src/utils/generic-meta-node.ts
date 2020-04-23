import {mdtypes} from './generic-meta-types'

const Package = Object.freeze({
  version: {mdtype: mdtypes.String},
  types: {
    isArray: true,
    mdtype: mdtypes.PackageTypeMembers,
  },
  name: {mdtype: mdtypes.String},
  members: {
    isArray: true,
    mdtype: mdtypes.String,
  },
})

const Profile = Object.freeze({
  applicationVisibilities: {
    isArray: true,
    mdtype: mdtypes.ProfileApplicationVisibility,
  },
  categoryGroupVisibilities: {
    isArray: true,
    mdtype: mdtypes.ProfileCategoryGroupVisibility,
  },
  dataCategories: {
    isArray: true,
    mdtype: mdtypes.String,
  },
  classAccesses: {
    isArray: true,
    mdtype: mdtypes.ProfileApexClassAccess,
  },
  custom: {mdtype: mdtypes.String},
  customMetadataTypeAccesses: {
    isArray: true,
    mdtype: mdtypes.ProfileCustomMetadataTypeAccess,
  },
  customPermissions: {
    isArray: true,
    mdtype: mdtypes.ProfileCustomPermissions,
  },
  customSettingAccesses: {
    isArray: true,
    mdtype: mdtypes.ProfileCustomSettingAccesses,
  },
  description: {mdtype: mdtypes.String},
  externalDataSourceAccesses: {
    isArray: true,
    mdtype: mdtypes.ProfileExternalDataSourceAccess,
  },
  fieldPermissions: {
    isArray: true,
    mdtype: mdtypes.ProfileFieldLevelSecurity,
  },
  flowAccesses: {
    isArray: true,
    mdtype: mdtypes.flowAccesses,
  },
  layoutAssignments: {
    isArray: true,
    mdtype: mdtypes.ProfileLayoutAssignments,
  },
  loginHours: {
    isArray: true,
    mdtype: mdtypes.ProfileLoginHours,
  },
  loginIpRanges: {
    isArray: true,
    mdtype: mdtypes.ProfileLoginIpRange,
  },
  objectPermissions: {
    isArray: true,
    mdtype: mdtypes.ProfileObjectPermissions,
  },
  pageAccesses: {
    isArray: true,
    mdtype: mdtypes.ProfileApexPageAccess,
  },
  profileActionOverrides: {
    isArray: true,
    mdtype: mdtypes.ProfileActionOverride,
  },
  recordTypeVisibilities: {
    isArray: true,
    mdtype: mdtypes.ProfileRecordTypeVisibility,
  },
  tabVisibilities: {
    isArray: true,
    mdtype: mdtypes.ProfileTabVisibility,
  },
  userLicense: {mdtype: mdtypes.String},
  userPermissions: {
    isArray: true,
    mdtype: mdtypes.ProfileUserPermission,
  },
})

export const fullMdConfig = Object.freeze({
  Package: Package,
  Profile: Profile,
})

export function getSupportedMeta() {
  return Object.keys(fullMdConfig)
}

export function getMetaConfig(meta: string) {
  return fullMdConfig[meta]
}

export const configJson = Object.freeze({
  supported: ['Package', 'Profile'],
  mdnodes: {
    version: {mdtype: mdtypes.String},
    types: {
      isArray: true,
      mdtype: mdtypes.PackageTypeMembers,
    },
    name: {mdtype: mdtypes.String},
    members: {
      isArray: true,
      mdtype: mdtypes.String,
    },
    applicationVisibilities: {
      isArray: true,
      mdtype: mdtypes.ProfileApplicationVisibility,
    },
    categoryGroupVisibilities: {
      isArray: true,
      mdtype: mdtypes.ProfileCategoryGroupVisibility,
    },
    dataCategories: {
      isArray: true,
      mdtype: mdtypes.String,
    },
    classAccesses: {
      isArray: true,
      mdtype: mdtypes.ProfileApexClassAccess,
    },
    custom: {mdtype: mdtypes.String},
    customMetadataTypeAccesses: {
      isArray: true,
      mdtype: mdtypes.ProfileCustomMetadataTypeAccess,
    },
    customPermissions: {
      isArray: true,
      mdtype: mdtypes.ProfileCustomPermissions,
    },
    customSettingAccesses: {
      isArray: true,
      mdtype: mdtypes.ProfileCustomSettingAccesses,
    },
    description: {mdtype: mdtypes.String},
    externalDataSourceAccesses: {
      isArray: true,
      mdtype: mdtypes.ProfileExternalDataSourceAccess,
    },
    fieldPermissions: {
      isArray: true,
      mdtype: mdtypes.ProfileFieldLevelSecurity,
    },
    flowAccesses: {
      isArray: true,
      mdtype: mdtypes.flowAccesses,
    },
    layoutAssignments: {
      isArray: true,
      mdtype: mdtypes.ProfileLayoutAssignments,
    },
    loginHours: {
      isArray: true,
      mdtype: mdtypes.ProfileLoginHours,
    },
    loginIpRanges: {
      isArray: true,
      mdtype: mdtypes.ProfileLoginIpRange,
    },
    objectPermissions: {
      isArray: true,
      mdtype: mdtypes.ProfileObjectPermissions,
    },
    pageAccesses: {
      isArray: true,
      mdtype: mdtypes.ProfileApexPageAccess,
    },
    profileActionOverrides: {
      isArray: true,
      mdtype: mdtypes.ProfileActionOverride,
    },
    recordTypeVisibilities: {
      isArray: true,
      mdtype: mdtypes.ProfileRecordTypeVisibility,
    },
    tabVisibilities: {
      isArray: true,
      mdtype: mdtypes.ProfileTabVisibility,
    },
    userLicense: {mdtype: mdtypes.String},
    userPermissions: {
      isArray: true,
      mdtype: mdtypes.ProfileUserPermission,
    },
  },
})
