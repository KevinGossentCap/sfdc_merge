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
    exclusiveKeys: ['recordType._', 'layout._'],
    keys: ['layout._', 'recordType._'],
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

const PermissionSet = Object.freeze({
  PermissionSetApplicationVisibility: Profile.ProfileApplicationVisibility,
  PermissionSetApexClassAccess: Profile.ProfileApexClassAccess,
  PermissionSetCustomMetadataTypeAccess:
    Profile.ProfileCustomMetadataTypeAccess,
  PermissionSetCustomPermissions: Profile.ProfileCustomPermissions,
  PermissionSetCustomSettingAccesses: Profile.ProfileCustomSettingAccesses,
  PermissionSetExternalDataSourceAccess:
    Profile.ProfileExternalDataSourceAccess,
  PermissionSetFieldPermissions: Profile.ProfileFieldLevelSecurity,
  PermissionSetObjectPermissions: Profile.ProfileObjectPermissions,
  PermissionSetApexPageAccess: Profile.ProfileApexPageAccess,
  PermissionSetRecordTypeVisibility: Profile.ProfileRecordTypeVisibility,
  PermissionSetTabSetting: Profile.ProfileTabVisibility,
  PermissionSetUserPermission: Profile.ProfileUserPermission,
})

const CustomLabels = Object.freeze({
  CustomLabel: {unicity: 'full', keys: ['fullName._']},
})

const CustomObjectTranslation = Object.freeze({
  ObjectNameCaseValue: {
    unicity: 'full',
    keys: ['caseType._', 'plural._', 'possessive._'],
  },
  CustomFieldTranslation: {unicity: 'full', keys: ['name._']},
  FieldSetTranslation: {unicity: 'full', keys: ['name._']},
  LayoutTranslation: {unicity: 'full', keys: ['layout._']},
  QuickActionTranslation: {unicity: 'full', keys: ['name._']},
  RecordTypeTranslation: {unicity: 'full', keys: ['name._']},
  SharingReasonTranslation: {unicity: 'full', keys: ['name._']},
  ValidationRuleTranslation: {unicity: 'full', keys: ['name._']},
  WebLinkTranslation: {unicity: 'full', keys: ['name._']},
  WorkflowTaskTranslation: {unicity: 'full', keys: ['name._']},
  LookupFilterTranslation: {},
  PicklistValueTranslation: {unicity: 'full', keys: ['masterLabel._']},
  LayoutSectionTranslation: {unicity: 'full', keys: ['section._']},
})

const GlobalValueSetTranslation = Object.freeze({
  ValueTranslation: {unicity: 'full', keys: ['masterLabel._']},
})

const Translations = Object.freeze({
  CustomApplicationTranslation: {unicity: 'full', keys: ['name._']},
  CustomLabelTranslation: {unicity: 'full', keys: ['name._']},
  CustomPageWebLinkTranslation: {unicity: 'full', keys: ['name._']},
  CustomTabTranslation: {unicity: 'full', keys: ['name._']},
  FlowDefinitionTranslation: {unicity: 'full', keys: ['fullName._']},
  PromptTranslation: {unicity: 'full', keys: ['name._']},
  GlobalQuickActionTranslation: {unicity: 'full', keys: ['name._']},
  ReportTypeTranslation: {unicity: 'full', keys: ['name._']},
  ScontrolTranslation: {unicity: 'full', keys: ['name._']},
  PromptVersionTranslation: {unicity: 'full', keys: ['name._']},
  FlowTranslation: {unicity: 'full', keys: ['fullName._']},
  FlowChoiceTranslation: {unicity: 'full', keys: ['name._']},
  FlowScreenTranslation: {unicity: 'full', keys: ['name._']},
  FlowStageTranslation: {unicity: 'full', keys: ['name._']},
  FlowChoiceUserInputTranslation: {unicity: 'full', keys: ['name._']},
  FlowInputValidationRuleTranslation: {},
  FlowScreenFieldTranslation: {unicity: 'full', keys: ['name._']},
  ReportTypeSectionTranslation: {unicity: 'full', keys: ['name._']},
  ReportTypeColumnTranslation: {unicity: 'full', keys: ['name._']},
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
  PermissionSetApplicationVisibility:
    PermissionSet.PermissionSetApplicationVisibility,
  PermissionSetApexClassAccess: PermissionSet.PermissionSetApexClassAccess,
  PermissionSetCustomMetadataTypeAccess:
    PermissionSet.PermissionSetCustomMetadataTypeAccess,
  PermissionSetCustomPermissions: PermissionSet.PermissionSetCustomPermissions,
  PermissionSetCustomSettingAccesses:
    PermissionSet.PermissionSetCustomSettingAccesses,
  PermissionSetExternalDataSourceAccess:
    PermissionSet.PermissionSetExternalDataSourceAccess,
  PermissionSetFieldPermissions: PermissionSet.PermissionSetFieldPermissions,
  PermissionSetObjectPermissions: PermissionSet.PermissionSetObjectPermissions,
  PermissionSetApexPageAccess: PermissionSet.PermissionSetApexPageAccess,
  PermissionSetRecordTypeVisibility:
    PermissionSet.PermissionSetRecordTypeVisibility,
  PermissionSetTabSetting: PermissionSet.PermissionSetTabSetting,
  PermissionSetUserPermission: PermissionSet.PermissionSetUserPermission,
  CustomLabel: CustomLabels.CustomLabel,
  ObjectNameCaseValue: CustomObjectTranslation.ObjectNameCaseValue,
  CustomFieldTranslation: CustomObjectTranslation.CustomFieldTranslation,
  FieldSetTranslation: CustomObjectTranslation.FieldSetTranslation,
  LayoutTranslation: CustomObjectTranslation.LayoutTranslation,
  QuickActionTranslation: CustomObjectTranslation.QuickActionTranslation,
  RecordTypeTranslation: CustomObjectTranslation.RecordTypeTranslation,
  SharingReasonTranslation: CustomObjectTranslation.SharingReasonTranslation,
  ValidationRuleTranslation: CustomObjectTranslation.ValidationRuleTranslation,
  WebLinkTranslation: CustomObjectTranslation.WebLinkTranslation,
  WorkflowTaskTranslation: CustomObjectTranslation.WorkflowTaskTranslation,
  LookupFilterTranslation: CustomObjectTranslation.LookupFilterTranslation,
  PicklistValueTranslation: CustomObjectTranslation.PicklistValueTranslation,
  LayoutSectionTranslation: CustomObjectTranslation.LayoutSectionTranslation,
  ValueTranslation: GlobalValueSetTranslation.ValueTranslation,
  CustomApplicationTranslation: Translations.CustomApplicationTranslation,
  CustomLabelTranslation: Translations.CustomLabelTranslation,
  CustomPageWebLinkTranslation: Translations.CustomPageWebLinkTranslation,
  CustomTabTranslation: Translations.CustomTabTranslation,
  FlowDefinitionTranslation: Translations.FlowDefinitionTranslation,
  PromptTranslation: Translations.PromptTranslation,
  GlobalQuickActionTranslation: Translations.GlobalQuickActionTranslation,
  ReportTypeTranslation: Translations.ReportTypeTranslation,
  ScontrolTranslation: Translations.ScontrolTranslation,
  PromptVersionTranslation: Translations.PromptVersionTranslation,
  FlowTranslation: Translations.FlowTranslation,
  FlowChoiceTranslation: Translations.FlowChoiceTranslation,
  FlowScreenTranslation: Translations.FlowScreenTranslation,
  FlowStageTranslation: Translations.FlowStageTranslation,
  FlowChoiceUserInputTranslation: Translations.FlowChoiceUserInputTranslation,
  FlowInputValidationRuleTranslation:
    Translations.FlowInputValidationRuleTranslation,
  FlowScreenFieldTranslation: Translations.FlowScreenFieldTranslation,
  ReportTypeSectionTranslation: Translations.ReportTypeSectionTranslation,
  ReportTypeColumnTranslation: Translations.ReportTypeColumnTranslation,
})
