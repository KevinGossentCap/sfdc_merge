export const configJson = Object.freeze({
  supported: ['Package', 'Profile'],
  mdnodes: {
    version: {
      get mdtype() {
        return configJson.mdtypes.String
      },
    },
    types: {
      isArray: true,
      sortKeys: ['name._'],
      get mdtype() {
        return configJson.mdtypes.PackageTypeMembers
      },
    },
    name: {
      get mdtype() {
        return configJson.mdtypes.String
      },
    },
    members: {
      isArray: true,
      sortKeys: ['_'],
      get mdtype() {
        return configJson.mdtypes.String
      },
    },
    applicationVisibilities: {
      isArray: true,
      sortKeys: ['application._'],
      get mdtype() {
        return configJson.mdtypes.ProfileApplicationVisibility
      },
    },
    categoryGroupVisibilities: {
      isArray: true,
      sortKeys: ['dataCategoryGroup._'],
      get mdtype() {
        return configJson.mdtypes.ProfileCategoryGroupVisibility
      },
    },
    dataCategories: {
      isArray: true,
      sortKeys: ['_'],
      get mdtype() {
        return configJson.mdtypes.String
      },
    },
    classAccesses: {
      isArray: true,
      sortKeys: ['apexClass._'],
      get mdtype() {
        return configJson.mdtypes.ProfileApexClassAccess
      },
    },
    custom: {
      get mdtype() {
        return configJson.mdtypes.String
      },
    },
    customMetadataTypeAccesses: {
      isArray: true,
      sortKeys: ['name._'],
      get mdtype() {
        return configJson.mdtypes.ProfileCustomMetadataTypeAccess
      },
    },
    customPermissions: {
      isArray: true,
      sortKeys: ['name._'],
      get mdtype() {
        return configJson.mdtypes.ProfileCustomPermissions
      },
    },
    customSettingAccesses: {
      isArray: true,
      sortKeys: ['name._'],
      get mdtype() {
        return configJson.mdtypes.ProfileCustomSettingAccesses
      },
    },
    description: {
      get mdtype() {
        return configJson.mdtypes.String
      },
    },
    externalDataSourceAccesses: {
      isArray: true,
      sortKeys: ['externalDataSource._'],
      get mdtype() {
        return configJson.mdtypes.ProfileExternalDataSourceAccess
      },
    },
    fieldPermissions: {
      isArray: true,
      sortKeys: ['field._'],
      get mdtype() {
        return configJson.mdtypes.ProfileFieldLevelSecurity
      },
    },
    flowAccesses: {
      isArray: true,
      sortKeys: ['flow._'],
      get mdtype() {
        return configJson.mdtypes.flowAccesses
      },
    },
    layoutAssignments: {
      isArray: true,
      sortKeys: ['recordType._', 'layout._'],
      get mdtype() {
        return configJson.mdtypes.ProfileLayoutAssignments
      },
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
      get mdtype() {
        return configJson.mdtypes.ProfileLoginHours
      },
    },
    loginIpRanges: {
      isArray: true,
      sortKeys: ['startAddress._', 'endAddress._'],
      get mdtype() {
        return configJson.mdtypes.ProfileLoginIpRange
      },
    },
    objectPermissions: {
      isArray: true,
      sortKeys: ['object._'],
      get mdtype() {
        return configJson.mdtypes.ProfileObjectPermissions
      },
    },
    pageAccesses: {
      isArray: true,
      sortKeys: ['apexPage._'],
      get mdtype() {
        return configJson.mdtypes.ProfileApexPageAccess
      },
    },
    profileActionOverrides: {
      isArray: true,
      sortKeys: [
        'actionName._',
        'type._',
        'pageOrSobjectType._',
        'formFactor._',
      ],
      get mdtype() {
        return configJson.mdtypes.ProfileActionOverride
      },
    },
    recordTypeVisibilities: {
      isArray: true,
      sortKeys: ['recordType._'],
      get mdtype() {
        return configJson.mdtypes.ProfileRecordTypeVisibility
      },
    },
    tabVisibilities: {
      isArray: true,
      sortKeys: ['tab._'],
      get mdtype() {
        return configJson.mdtypes.ProfileTabVisibility
      },
    },
    userLicense: {
      get mdtype() {
        return configJson.mdtypes.String
      },
    },
    userPermissions: {
      isArray: true,
      sortKeys: ['name._'],
      get mdtype() {
        return configJson.mdtypes.ProfileUserPermission
      },
    },
  },
  mdtypes: {
    PackageTypeMembers: {
      unicity: 'full',
      keys: ['name._'],
    },
    String: {keys: ['_']},
    ProfileApplicationVisibility: {unicity: 'full', keys: ['application._']},
    ProfileCategoryGroupVisibility: {
      unicity: 'full',
      keys: ['dataCategoryGroup._'],
    },
    ProfileApexClassAccess: {unicity: 'full', keys: ['apexClass._']},
    ProfileCustomMetadataTypeAccess: {unicity: 'full', keys: ['name._']},
    ProfileCustomPermissions: {unicity: 'full', keys: ['name._']},
    ProfileCustomSettingAccesses: {unicity: 'full', keys: ['name._']},
    ProfileExternalDataSourceAccess: {
      unicity: 'full',
      keys: ['externalDataSource._'],
    },
    ProfileFieldLevelSecurity: {unicity: 'full', keys: ['field._']},
    flowAccesses: {unicity: 'full', keys: ['flow._']},
    ProfileLayoutAssignments: {
      unicity: 'exclusive',
      keys: ['recordType._', 'layout._'],
    },
    ProfileLoginHours: {
      unicity: 'exclusive',
      keys: [
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
    },
    ProfileLoginIpRange: {
      unicity: 'full',
      keys: ['startAddress._', 'endAddress._'],
    },
    ProfileObjectPermissions: {unicity: 'full', keys: ['object._']},
    ProfileApexPageAccess: {unicity: 'full', keys: ['apexPage._']},
    ProfileActionOverride: {
      unicity: 'full',
      keys: ['actionName._', 'type._', 'pageOrSobjectType._', 'formFactor._'],
    },
    ProfileRecordTypeVisibility: {unicity: 'full', keys: ['recordType._']},
    ProfileTabVisibility: {unicity: 'full', keys: ['tab._']},
    ProfileUserPermission: {unicity: 'full', keys: ['name._']},
  },
})
