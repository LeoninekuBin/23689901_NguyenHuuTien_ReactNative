import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import type { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);

    try {
      const result = await fetchPhone("1");
      setPhone(result);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Đã xảy ra lỗi khi tải dữ liệu"
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  if (!phone) {
    return <Loading />;
  }

  return <SelectPhoneApp phone={phone} />;
}