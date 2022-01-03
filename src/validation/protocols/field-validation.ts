interface FieldValidation {
  field: string;
  validate: (value: string) => Error;
}

export { FieldValidation };
