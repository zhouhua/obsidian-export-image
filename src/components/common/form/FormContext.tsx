import React, { createContext, useContext, useState } from 'react';

interface FormContextType {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  setValues: (values: any) => void;
}

const FormContext = createContext<FormContextType>({} as FormContextType);

export const FormProvider: React.FC<{
  initialValues: any;
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  const [values, setValues] = useState(initialValues);

  const setFieldValue = (field: string, value: any) => {
    setValues((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ values, setFieldValue, setValues }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext); 