const String = Object.freeze({keys: ['_']})

const Package = Object.freeze({
  PackageTypeMembers: {
    unicity: 'full',
    keys: ['name._'],
  },
})

const Profile = Object.freeze({
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
})

export const mdtypes = Object.freeze({
  String: String,
  PackageTypeMembers: Package.PackageTypeMembers,
  ProfileApplicationVisibility: Profile.ProfileApplicationVisibility,
  ProfileCategoryGroupVisibility: Profile.ProfileCategoryGroupVisibility,
  ProfileApexClassAccess: Profile.ProfileApexClassAccess,
  ProfileCustomMetadataTypeAccess: Profile.ProfileCustomMetadataTypeAccess,
  ProfileCustomPermissions: Profile.ProfileCustomPermissions,
  ProfileCustomSettingAccesses: Profile.ProfileCustomSettingAccesses,
  ProfileExternalDataSourceAccess: Profile.ProfileExternalDataSourceAccess,
  ProfileFieldLevelSecurity: Profile.ProfileFieldLevelSecurity,
  flowAccesses: Profile.flowAccesses,
  ProfileLayoutAssignments: Profile.ProfileLayoutAssignments,
  ProfileLoginHours: Profile.ProfileLoginHours,
  ProfileLoginIpRange: Profile.ProfileLoginIpRange,
  ProfileObjectPermissions: Profile.ProfileObjectPermissions,
  ProfileApexPageAccess: Profile.ProfileApexPageAccess,
  ProfileActionOverride: Profile.ProfileActionOverride,
  ProfileRecordTypeVisibility: Profile.ProfileRecordTypeVisibility,
  ProfileTabVisibility: Profile.ProfileTabVisibility,
  ProfileUserPermission: Profile.ProfileUserPermission,
})
