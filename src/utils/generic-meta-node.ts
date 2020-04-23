import {mdtypes} from './generic-meta-types'

const Package = Object.freeze({
  version: {mdtype: mdtypes.String},
  types: {
    isArray: true,
    sortKeys: ['name._'],
    mdtype: mdtypes.PackageTypeMembers,
  },
  name: {mdtype: mdtypes.String},
  members: {
    isArray: true,
    sortKeys: ['_'],
    mdtype: mdtypes.String,
  },
})

const Profile = Object.freeze({
  applicationVisibilities: {
    isArray: true,
    sortKeys: ['application._'],
    mdtype: mdtypes.ProfileApplicationVisibility,
  },
  categoryGroupVisibilities: {
    isArray: true,
    sortKeys: ['dataCategoryGroup._'],
    mdtype: mdtypes.ProfileCategoryGroupVisibility,
  },
  dataCategories: {
    isArray: true,
    sortKeys: ['_'],
    mdtype: mdtypes.String,
  },
  classAccesses: {
    isArray: true,
    sortKeys: ['apexClass._'],
    mdtype: mdtypes.ProfileApexClassAccess,
  },
  custom: {mdtype: mdtypes.String},
  customMetadataTypeAccesses: {
    isArray: true,
    sortKeys: ['name._'],
    mdtype: mdtypes.ProfileCustomMetadataTypeAccess,
  },
  customPermissions: {
    isArray: true,
    sortKeys: ['name._'],
    mdtype: mdtypes.ProfileCustomPermissions,
  },
  customSettingAccesses: {
    isArray: true,
    sortKeys: ['name._'],
    mdtype: mdtypes.ProfileCustomSettingAccesses,
  },
  description: {mdtype: mdtypes.String},
  externalDataSourceAccesses: {
    isArray: true,
    sortKeys: ['externalDataSource._'],
    mdtype: mdtypes.ProfileExternalDataSourceAccess,
  },
  fieldPermissions: {
    isArray: true,
    sortKeys: ['field._'],
    mdtype: mdtypes.ProfileFieldLevelSecurity,
  },
  flowAccesses: {
    isArray: true,
    sortKeys: ['flow._'],
    mdtype: mdtypes.flowAccesses,
  },
  layoutAssignments: {
    isArray: true,
    sortKeys: ['recordType._', 'layout._'],
    mdtype: mdtypes.ProfileLayoutAssignments,
  },
  loginHours: {
    isArray: true,
    sortKeys: [
      'fridayEnd._',
      'fridayStart._',
      'mondayEnd._',
      'mondayStart._',
      'saturdayEnd._',
      'saturdayStart._',
      'sundayEnd._',
      'sundayStart._',
      'thursdayEnd._',
      'thursdayStart._',
      'tuesdayEnd._',
      'tuesdayStart._',
      'wednesdayEnd._',
      'wednesdayStart._',
    ],
    mdtype: mdtypes.ProfileLoginHours,
  },
  loginIpRanges: {
    isArray: true,
    sortKeys: ['startAddress._', 'endAddress._'],
    mdtype: mdtypes.ProfileLoginIpRange,
  },
  objectPermissions: {
    isArray: true,
    sortKeys: ['object._'],
    mdtype: mdtypes.ProfileObjectPermissions,
  },
  pageAccesses: {
    isArray: true,
    sortKeys: ['apexPage._'],
    mdtype: mdtypes.ProfileApexPageAccess,
  },
  profileActionOverrides: {
    isArray: true,
    sortKeys: ['actionName._', 'type._', 'pageOrSobjectType._', 'formFactor._'],
    mdtype: mdtypes.ProfileActionOverride,
  },
  recordTypeVisibilities: {
    isArray: true,
    sortKeys: ['recordType._'],
    mdtype: mdtypes.ProfileRecordTypeVisibility,
  },
  tabVisibilities: {
    isArray: true,
    sortKeys: ['tab._'],
    mdtype: mdtypes.ProfileTabVisibility,
  },
  userLicense: {mdtype: mdtypes.String},
  userPermissions: {
    isArray: true,
    sortKeys: ['name._'],
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
      sortKeys: ['name._'],
      mdtype: mdtypes.PackageTypeMembers,
    },
    name: {mdtype: mdtypes.String},
    members: {
      isArray: true,
      sortKeys: ['_'],
      mdtype: mdtypes.String,
    },
    applicationVisibilities: {
      isArray: true,
      sortKeys: ['application._'],
      mdtype: mdtypes.ProfileApplicationVisibility,
    },
    categoryGroupVisibilities: {
      isArray: true,
      sortKeys: ['dataCategoryGroup._'],
      mdtype: mdtypes.ProfileCategoryGroupVisibility,
    },
    dataCategories: {
      isArray: true,
      sortKeys: ['_'],
      mdtype: mdtypes.String,
    },
    classAccesses: {
      isArray: true,
      sortKeys: ['apexClass._'],
      mdtype: mdtypes.ProfileApexClassAccess,
    },
    custom: {mdtype: mdtypes.String},
    customMetadataTypeAccesses: {
      isArray: true,
      sortKeys: ['name._'],
      mdtype: mdtypes.ProfileCustomMetadataTypeAccess,
    },
    customPermissions: {
      isArray: true,
      sortKeys: ['name._'],
      mdtype: mdtypes.ProfileCustomPermissions,
    },
    customSettingAccesses: {
      isArray: true,
      sortKeys: ['name._'],
      mdtype: mdtypes.ProfileCustomSettingAccesses,
    },
    description: {mdtype: mdtypes.String},
    externalDataSourceAccesses: {
      isArray: true,
      sortKeys: ['externalDataSource._'],
      mdtype: mdtypes.ProfileExternalDataSourceAccess,
    },
    fieldPermissions: {
      isArray: true,
      sortKeys: ['field._'],
      mdtype: mdtypes.ProfileFieldLevelSecurity,
    },
    flowAccesses: {
      isArray: true,
      sortKeys: ['flow._'],
      mdtype: mdtypes.flowAccesses,
    },
    layoutAssignments: {
      isArray: true,
      sortKeys: ['recordType._', 'layout._'],
      mdtype: mdtypes.ProfileLayoutAssignments,
    },
    loginHours: {
      isArray: true,
      sortKeys: [
        'fridayEnd._',
        'fridayStart._',
        'mondayEnd._',
        'mondayStart._',
        'saturdayEnd._',
        'saturdayStart._',
        'sundayEnd._',
        'sundayStart._',
        'thursdayEnd._',
        'thursdayStart._',
        'tuesdayEnd._',
        'tuesdayStart._',
        'wednesdayEnd._',
        'wednesdayStart._',
      ],
      mdtype: mdtypes.ProfileLoginHours,
    },
    loginIpRanges: {
      isArray: true,
      sortKeys: ['startAddress._', 'endAddress._'],
      mdtype: mdtypes.ProfileLoginIpRange,
    },
    objectPermissions: {
      isArray: true,
      sortKeys: ['object._'],
      mdtype: mdtypes.ProfileObjectPermissions,
    },
    pageAccesses: {
      isArray: true,
      sortKeys: ['apexPage._'],
      mdtype: mdtypes.ProfileApexPageAccess,
    },
    profileActionOverrides: {
      isArray: true,
      sortKeys: [
        'actionName._',
        'type._',
        'pageOrSobjectType._',
        'formFactor._',
      ],
      mdtype: mdtypes.ProfileActionOverride,
    },
    recordTypeVisibilities: {
      isArray: true,
      sortKeys: ['recordType._'],
      mdtype: mdtypes.ProfileRecordTypeVisibility,
    },
    tabVisibilities: {
      isArray: true,
      sortKeys: ['tab._'],
      mdtype: mdtypes.ProfileTabVisibility,
    },
    userLicense: {mdtype: mdtypes.String},
    userPermissions: {
      isArray: true,
      sortKeys: ['name._'],
      mdtype: mdtypes.ProfileUserPermission,
    },
  },
})
