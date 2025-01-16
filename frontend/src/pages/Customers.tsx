import React from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import CustomTable from "../components/tables/customTable/CustomTable";
import { IcustomersTable } from "../interfaces/Itable";
import { customers, customersHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
const url =
  "";
function Customers() {
  const { t } = useTranslation();
  const { data, error, status } = useFetch<IcustomersTable[]>(url);
  let customerTable;

  if (status === "loading") {
    customerTable = <LoadingSpinner />;
  }

  if (error) {
    customerTable = (
      <CustomTable limit={10} headData={customersHeader} bodyData={customers} />
    );
  }

  if (status === "fetched" && data) {
    customerTable = (
      <CustomTable limit={10} headData={customersHeader} bodyData={data} />
    );
  }

  return (
    <section>
      <h2 className="title">{t("customers")}</h2>
      {customerTable}
    </section>
  );
}

export default Customers;
