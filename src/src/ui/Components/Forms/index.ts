export * from './CreditContract/CreditContractForm';
export * from './GeneralAgreement/GeneralAgreementForm';
export * from './Report/ReportCreateForm';
export * from './Support/SupportForm';
export * from './User/UserConfirmForm';
export * from './User/UserForm';
export * from './User/UserSMSCodeConfirm';
export * from './User/UserProfileViewForm';
export * from './User/UserProfileEditForm';
export * from './User/RegistrationForm';
export * from './ExportContract/CFAExportContractViewForm';
export * from './ExportContract/ExportContractVewForm';
export * from './CFA/CFARequestApiViewForm';
export * from './CFA/CFARequestManualViewForm';
export * from './CFA_Draft/CFADraftCreateForm';
export * from './CFA_Draft/CFADraftRequestEditForm';

export const getDefaultFormValues = <T>(
  data: T | undefined,
  defaultData: {[key in keyof T]?: any}
) => {
  const values = ({...data} as T) || ({} as T);
  Object.keys(defaultData).forEach((key) => {
    const value = data?.[key as keyof T];
    if (value === null || value === undefined) {
      const defaultValue = defaultData[key as keyof T];
      values[key as keyof T] = defaultValue as never;
    }
  });
  return values;
};
