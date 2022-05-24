import { faker } from "@faker-js/faker";
export const mockDepartments = [
  {
    name: "Office Administration",
    description:
      "Deals with administrative matters in the office. As such, it is involved in topics such as hiring and firing employees, as well as other office-related business. Among other tasks, it also handles orders for supplies and equipment which may be needed by different departments.",
  },
  {
    name: "Production Department",
    description:
      "Deals with matters relating to production of products. In an ideal business, this would entail ordering raw materials, managing manufacturing plants and machines that produce goods that are then sold on to customers.",
  },
  {
    name: "Financial",
    description:
      "Deals with matters relating to finances at the company. Among other tasks, it would include paying bills related to the company and preparing financial reports.",
  },
  {
    name: "Marketing",
    description:
      "Deals with marketing of goods, services and/or processes that are classified as means of making a profit.",
  },
  {
    name: "Sales Department",
    description:
      "Deals with sales of products or services that would be sent to buyers. It is involved with advertising and promotions, as well as salespeople's contracts and pay structure and others associated issues.",
  },
  {
    name: "Help Desk/IT Department",
    description:
      "A help desk is a service desk department that can be found in any company or organization. The duties and tasks for a help desk are usually related to technical issues, systems administration, and other IT-specific issues. This could also include field support.",
  },
];

export const mockRoles = [
  {
    name: "Administrative",
    description:
      "The Administrator is responsible for all the books and records of the company. They maintain financial records such as invoices, payroll/salary expenses and payables. The Administrator also prepares budgets and performs cost analysis.",
  },

  {
    name: "Business Manager",
    description:
      "The manager oversees all work production, handle any customers that come into the store and handle general store operations.",
  },
  {
    name: "Help Desk Coordinator",
    description:
      "Manages the help desk by ensuring that they have enough staff to handle phone calls, email replies and knowledge base articles.",
  },
  {
    name: "Help Desk Technician",
    description:
      "Handles requests for assistance with hardware, software or other issues. They are responsible for understanding the problem the customer has experienced and solving it as quickly as possible in order to maintain a high level of customer satisfaction.",
  },
  {
    name: "Help Desk Manager",
    description:
      "Responsible for managing the help desk, including hiring, developing and planning.",
  },
  {
    name: "Help Desk Staff",
    description:
      "often act as the first point of contact for the company. This can provide an opportunity for technical support staff to acquire sufficient knowledge about a company's products and services to represent it in sales roles.",
  },
];

export const mockUsers = (() => {
  return Array(5)
    .fill(1)
    .map((user, index) => {
      return {
        username: index === 0 ? "mosh" : faker.internet.userName(),
        password: index === 0 ? "mosh12" : faker.internet.password(),
        first_name: faker.name.firstName(),
        middle_name: faker.name.middleName(),
        last_name: faker.name.lastName(),
        email: index === 0 ? "moshontong@gmail.com" : faker.internet.email(),
        created_at: faker.date.past().toLocaleDateString(),
        updated_at: faker.date.recent().toLocaleDateString(),
      };
    });
})();
