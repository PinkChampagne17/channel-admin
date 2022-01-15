import {
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import { Field } from "./types";

interface Props<T> {
  fields: Array<Field<T>>;
}

export function Fields<T>({ fields }: Props<T>) {
  const { touched, errors, getFieldProps } = useFormikContext<T>();
  return (
    <>
      {fields.map(({ label, type, name, readonly, options }) => {
        const key: string | number =
          typeof name === "symbol" ? name.toString() : name;
        const formikFieldProps = getFieldProps(name);

        switch (type) {
          case "select":
            return (
              <FormControl key={key}>
                {label && <InputLabel variant="standard">{label}</InputLabel>}
                <NativeSelect
                  inputProps={{
                    ...formikFieldProps,
                  }}
                >
                  {options?.map(({ text, value }) => (
                    <option value={value} key={text}>
                      {text}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            );

          // return (
          //   <FormControl key={key}>
          //     {label && <InputLabel>{label}</InputLabel>}
          //     <Select label={label} {...commonProps} onChange={console.log}>
          //       {options?.map(({ text, value }) => (
          //         <MenuItem value={value} key={text}>
          //           {text}
          //         </MenuItem>
          //       ))}
          //     </Select>
          //   </FormControl>
          // );

          // case "checkbox":
          //   return (
          //     <FormControlLabel
          //       key={key}
          //       control={<Checkbox {...commonProps} disabled={readonly} />}
          //       label="Label"
          //     />
          //   );

          case "input":
          default:
            return (
              <TextField
                margin="dense"
                key={key}
                label={label}
                type={type}
                {...formikFieldProps}
                value={formikFieldProps.value ?? ""}
                disabled={readonly}
                error={touched[name] && Boolean(errors[name])}
                helperText={touched[name] && errors[name]}
              />
            );
        }
      })}
    </>
  );
}
