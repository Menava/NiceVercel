import { Routes, Route } from "react-router-dom";
import React from "react";

import Items from "./pages/itemsTable/ItemsTable";
import "./pages.scss";

import ApiTestingGround from "./APIServices/ApiTestingGround";
import Tables from "./pages/tables/Tables";
import PrepareService from "./pages/prepareService/PrepareService";
import Dashboard from "./pages/dashboard/Dashboard";
import EmployeeDetail from "./pages/employeeDetail/EmployeeDetail";
import CustomerDetails from "./pages/CustomerDetail/CustomerDetails";
import ServicesTable from "./pages/servicesTable/ServicesTable";
import EmployeesTable from "./pages/employeesTable/EmployeesTable";
import CustomersTable from "./pages/customersTable/CustomersTable";
import ItemsTable from "./pages/itemsTable/ItemsTable";
import VouchersTable from "./pages/vouchersTable/VouchersTable";
import Services from "./pages/services/Services";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
import SuppliersTable from "./pages/suppliersTable/SuppliersTable";
import ServicesStatus from "./pages/serviceStatus/ServicesStatus";
import ServiceStatusDetail from "./pages/serviceStatusDetail/ServiceStatusDetail";
import CreateVoucher from "./pages/voucherDetail/CreateVoucher";
import MinusTables from "./pages/minusTables/MinusTables";
import EmployeeSalariesTable from "./pages/employeeSalariesTable/EmployeeSalariesTable";
import GeneralPurchasesTable from "./pages/generalPurchasesTable/GeneralPurchasesTable";
import PrintVoucher from "./pages/printVoucher/PrintVoucher";
import WaitingListsTable from "./pages/waitingListsTable/WaitingListsTable";
import VouDetail from "./components/vouDetail/VouDetail";
import ItemPurchasesTable from "./pages/itemPurchasesTable/ItemPurchasesTable";

function Pages() {
  return (
    <div className="pages">
      <Routes>
        <Route path="/">
          <Route index element={<PrepareService />} />
          <Route path="items" element={<Items />} />
          <Route path="api" element={<ApiTestingGround />} />
          <Route path="tables" element={<Tables />} />
          <Route path="-$tables" element={<MinusTables />} />
          <Route path="services" element={<Services />} />
          <Route path="serviceStatus" element={<ServicesStatus />} />
          <Route
            path="services/serviceDetail/:serviceId"
            element={<ServiceDetail />}
          />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tables/customersTable" element={<CustomersTable />} />
          <Route path="tables/vouchersTable" element={<VouchersTable />} />
          <Route
            path="tables/vouchersTable/:voucherId"
            element={<VouDetail />}
          />
          <Route
            path="tables/vouchersTable/printVoucher/:voucherId"
            element={<PrintVoucher />}
          />
          <Route path="tables/employeesTable" element={<EmployeesTable />} />
          <Route
            path="-$tables/employeesSalariesTable"
            element={<EmployeeSalariesTable />}
          />
          <Route
            path="-$tables/generalPurchasesTable"
            element={<GeneralPurchasesTable />}
          />
          <Route
            path="-$tables/itemPurchases"
            element={<ItemPurchasesTable />}
          />
          <Route path="/waitingList" element={<WaitingListsTable />} />
          <Route path="tables/servicesTable" element={<ServicesTable />} />
          <Route path="tables/itemsTable" element={<ItemsTable />} />
          <Route path="tables/suppliersTable" element={<SuppliersTable />} />
          <Route
            path="createVoucher/:servicePlaceId"
            element={<CreateVoucher />}
          />
          <Route
            path="tables/employeesTable/:employeeId"
            element={<EmployeeDetail />}
          />
          <Route
            path="tables/customersTable/:customerId"
            element={<CustomerDetails />}
          />
          <Route path="tables/itemsTable/:itemId" element={<ItemDetail />} />
          <Route
            path="serviceStatus/:servicePlaceId"
            element={<ServiceStatusDetail />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default Pages;
