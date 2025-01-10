import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useFormContext } from 'react-hook-form';

interface Props {
  label: string;
  inputProps: React.ComponentProps<'input'>;
}
const toCamelCase = (str: string) => {
  return str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());
};

function ControlledField({ label, inputProps }: Props) {
  const form = useFormContext();
  // console.log('🚀 ~ ControlledField ~ form:', form.formState.errors);

  return (
    <FormField
      control={form.control}
      name={toCamelCase(label)}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...inputProps}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ControlledField;
