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

const PermissionSet = Object.freeze({
  applicationVisibilities: {
    isArray: true,
    mdtype: mdtypes.PermissionSetApplicationVisibility,
  },
  classAccesses: {
    isArray: true,
    mdtype: mdtypes.PermissionSetApexClassAccess,
  },
  customMetadataTypeAccesses: {
    isArray: true,
    mdtype: mdtypes.PermissionSetCustomMetadataTypeAccess,
  },
  customPermissions: {
    isArray: true,
    mdtype: mdtypes.PermissionSetCustomPermissions,
  },
  customSettingAccesses: {
    isArray: true,
    mdtype: mdtypes.PermissionSetCustomSettingAccesses,
  },
  description: {mdtype: mdtypes.String},
  externalDataSourceAccesses: {
    isArray: true,
    mdtype: mdtypes.PermissionSetExternalDataSourceAccess,
  },
  fieldPermissions: {
    isArray: true,
    mdtype: mdtypes.PermissionSetFieldPermissions,
  },
  hasActivationRequired: {mdtype: mdtypes.String},
  label: {mdtype: mdtypes.String},
  license: {mdtype: mdtypes.String},
  objectPermissions: {
    isArray: true,
    mdtype: mdtypes.PermissionSetObjectPermissions,
  },
  pageAccesses: {
    isArray: true,
    mdtype: mdtypes.PermissionSetApexPageAccess,
  },
  recordTypeVisibilities: {
    isArray: true,
    mdtype: mdtypes.PermissionSetRecordTypeVisibility,
  },
  tabSettings: {
    isArray: true,
    mdtype: mdtypes.PermissionSetTabSetting,
  },
  userPermissions: {
    isArray: true,
    mdtype: mdtypes.PermissionSetUserPermission,
  },
})

const CustomLabels = Object.freeze({
  labels: {
    isArray: true,
    mdtype: mdtypes.CustomLabel,
  },
})

const CustomObjectTranslation = Object.freeze({
  caseValues: {
    isArray: true,
    mdtype: mdtypes.ObjectNameCaseValue,
  },
  fields: {
    isArray: true,
    mdtype: mdtypes.CustomFieldTranslation,
  },
  fieldSets: {
    isArray: true,
    mdtype: mdtypes.FieldSetTranslation,
  },
  gender: {
    mdtype: mdtypes.String,
  },
  layouts: {
    isArray: true,
    mdtype: mdtypes.LayoutTranslation,
  },
  nameFieldLabel: {
    mdtype: mdtypes.String,
  },
  quickActions: {
    isArray: true,
    mdtype: mdtypes.QuickActionTranslation,
  },
  recordTypes: {
    isArray: true,
    mdtype: mdtypes.RecordTypeTranslation,
  },
  sharingReasons: {
    isArray: true,
    mdtype: mdtypes.SharingReasonTranslation,
  },
  startsWith: {
    mdtype: mdtypes.String,
  },
  validationRules: {
    isArray: true,
    mdtype: mdtypes.ValidationRuleTranslation,
  },
  webLinks: {
    isArray: true,
    mdtype: mdtypes.WebLinkTranslation,
  },
  workflowTasks: {
    isArray: true,
    mdtype: mdtypes.WorkflowTaskTranslation,
  },
  description: {
    mdtype: mdtypes.String,
  },
  help: {
    mdtype: mdtypes.String,
  },
  label: {
    mdtype: mdtypes.String,
  },
  lookupFilter: {
    isArray: false,
    mdtype: mdtypes.LookupFilterTranslation,
  },
  name: {
    mdtype: mdtypes.String,
  },
  picklistValues: {
    isArray: true,
    mdtype: mdtypes.PicklistValueTranslation,
  },
  relationshipLabel: {
    mdtype: mdtypes.String,
  },
  sections: {
    isArray: true,
    mdtype: mdtypes.LayoutSectionTranslation,
  },
})

const GlobalValueSetTranslation = Object.freeze({
  valueTranslation: {
    isArray: true,
    mdtype: mdtypes.ValueTranslation,
  },
})

const StandardValueSetTranslation = Object.freeze({
  valueTranslation: {
    isArray: true,
    mdtype: mdtypes.ValueTranslation,
  },
})

const Translations = Object.freeze({
  customApplications: {
    isArray: true,
    mdtype: mdtypes.CustomApplicationTranslation,
  },
  customLabels: {
    isArray: true,
    mdtype: mdtypes.CustomLabelTranslation,
  },
  customPageWebLinks: {
    isArray: true,
    mdtype: mdtypes.CustomPageWebLinkTranslation,
  },
  customTabs: {
    isArray: true,
    mdtype: mdtypes.CustomTabTranslation,
  },
  flowDefinitions: {
    isArray: true,
    mdtype: mdtypes.FlowDefinitionTranslation,
  },
  prompts: {
    isArray: true,
    mdtype: mdtypes.PromptTranslation,
  },
  quickActions: {
    isArray: true,
    mdtype: mdtypes.GlobalQuickActionTranslation,
  },
  reportTypes: {
    isArray: true,
    mdtype: mdtypes.ReportTypeTranslation,
  },
  scontrols: {
    isArray: true,
    mdtype: mdtypes.ScontrolTranslation,
  },
  promptVersions: {
    isArray: true,
    mdtype: mdtypes.PromptVersionTranslation,
  },
  flows: {
    isArray: true,
    mdtype: mdtypes.FlowTranslation,
  },
  choices: {
    isArray: true,
    mdtype: mdtypes.FlowChoiceTranslation,
  },
  screens: {
    isArray: true,
    mdtype: mdtypes.FlowScreenTranslation,
  },
  stages: {
    isArray: true,
    mdtype: mdtypes.FlowStageTranslation,
  },
  userInput: {
    isArray: false,
    mdtype: mdtypes.FlowChoiceUserInputTranslation,
  },
  label: {
    mdtype: mdtypes.String,
  },
  choiceText: {
    mdtype: mdtypes.String,
  },
  promptText: {
    mdtype: mdtypes.String,
  },
  errorMessage: {
    mdtype: mdtypes.String,
  },
  validationRule: {
    isArray: false,
    mdtype: mdtypes.FlowInputValidationRuleTranslation,
  },
  helpText: {
    mdtype: mdtypes.String,
  },
  pausedText: {
    mdtype: mdtypes.String,
  },
  fields: {
    isArray: true,
    mdtype: mdtypes.FlowScreenFieldTranslation,
  },
  fieldText: {
    mdtype: mdtypes.String,
  },
  description: {
    mdtype: mdtypes.String,
  },
  sections: {
    isArray: true,
    mdtype: mdtypes.ReportTypeSectionTranslation,
  },
  columns: {
    isArray: true,
    mdtype: mdtypes.ReportTypeColumnTranslation,
  },
})

export const fullMdConfig = Object.freeze({
  Package: Package,
  Profile: Profile,
  PermissionSet: PermissionSet,
  CustomLabels: CustomLabels,
  CustomObjectTranslation: CustomObjectTranslation,
  GlobalValueSetTranslation: GlobalValueSetTranslation,
  StandardValueSetTranslation: StandardValueSetTranslation,
  Translations: Translations,
})

export function getSupportedMeta() {
  return Object.keys(fullMdConfig)
}

export function getMetaConfig(meta: string) {
  return fullMdConfig[meta]
}
