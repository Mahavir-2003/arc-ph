import React from 'react';
import { Input, Tooltip } from "@nextui-org/react";
import { Info } from "lucide-react";

const FormField = ({ label, name, value, onChange, error, required, type = "text", description }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <Input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          isRequired={required}
          variant="bordered"
          color={error ? "danger" : "primary"}
          errorMessage={error}
          fullWidth
          classNames={{
            input: "text-base",
            inputWrapper: "bg-gray-50 hover:bg-gray-100 transition-colors",
          }}
        />
        {description && (
          <Tooltip content={description}>
            <Info className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 cursor-pointer" size={18} />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default FormField;