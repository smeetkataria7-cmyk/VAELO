"use client";

import { useEffect, useId, useState } from "react";
import { getClientOptions } from "@/app/admin/client-options-action";
import type { ClientOption } from "@/lib/clients";

/** Email input with a dropdown of existing clients — you can still type a new one. */
export function ClientEmailInput({
  name = "client_email",
  required,
  placeholder = "client@brand.com",
  defaultValue,
  className,
}: {
  name?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}) {
  const [opts, setOpts] = useState<ClientOption[]>([]);
  const id = useId();

  useEffect(() => {
    getClientOptions()
      .then(setOpts)
      .catch(() => {});
  }, []);

  return (
    <>
      <input
        list={id}
        name={name}
        type="email"
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={className}
      />
      <datalist id={id}>
        {opts.map((o) => (
          <option key={o.email} value={o.email}>
            {o.name ? `${o.name} (${o.email})` : o.email}
          </option>
        ))}
      </datalist>
    </>
  );
}
