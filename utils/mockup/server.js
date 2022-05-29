import { createServer, Factory, RestSerializer } from "miragejs";
import { mockDepartments, mockRoles, mockUsers } from "./data";
import { models } from "./model";
import { faker } from "@faker-js/faker";

const AppSerializer = RestSerializer.extend({
  embed: true,
  root: false,
});

export function makeServer({ environment = "test", apiUrl }) {
  let server = createServer({
    environment,
    serializers: {
      application: AppSerializer,
      user: AppSerializer.extend({ include: ["department", "role"] }),
      ticket: AppSerializer.extend({ include: ["user", "comment"] }),
      comment: AppSerializer.extend({ include: ["ticket", "user"] }),
    },

    models: { ...models },
    factories: {
      department: Factory.extend({
        name(i) {
          return mockDepartments[i].name;
        },
        description(i) {
          return mockDepartments[i].description;
        },
      }),
      role: Factory.extend({
        name(i) {
          return mockRoles[i].name;
        },
        description(i) {
          return mockRoles[i].description;
        },
      }),
      ticket: Factory.extend({
        ticket_uuid() {
          return faker.datatype.uuid();
        },
        status() {
          return "Pending";
        },
        subject() {
          return faker.lorem.sentence(5);
        },
        description() {
          return faker.lorem.paragraph(3);
        },
        created_at() {
          return faker.date.past().toLocaleDateString();
        },
        updated_at() {
          return faker.date.recent().toLocaleDateString();
        },
      }),
      comment: Factory.extend({
        reply() {
          return faker.lorem.paragraphs(2);
        },
        created_at() {
          return faker.date.past().toLocaleDateString();
        },
        updated_at() {
          return faker.date.recent().toLocaleDateString();
        },
      }),
    },
    seeds(server) {
      let departments = server.createList("department", mockDepartments.length);
      let roles = server.createList("role", mockRoles.length);
      let rolesOfHelpDesk = [
        "Help Desk Coordinator",
        "Help Desk Technician",
        "Help Desk Manager",
        "Help Desk Staff",
      ];
      server.create("user", {
        ...mockUsers[0],
        department: departments[5],
        role: roles[4],
      });
      mockUsers.forEach((value, index) => {
        if (index === 0) {
          return;
        }

        let depRan = depRandomFunction();
        let roleRan = roleRandomFunction();
        server.create("user", {
          ...value,
          department: (() => {
            if (rolesOfHelpDesk.includes(mockRoles[roleRan]["name"])) {
              return departments[5];
            }

            return departments[depRan];
          })(),
          role: roles[roleRan],
        });
      });
      let users = server.schema.users.all();
      let tickets = server.createList("ticket", 2, {
        user: (() => {
          return users.models[2];
        })(),
      });

      server.createList("comment", 5, {
        user: (() => {
          return users.models[1];
        })(),
        ticket: (() => {
          return tickets[0];
        })(),
      });
    },
    routes() {
      this.namespace = "api";
      this.urlPrefix = apiUrl;
      this.timing = 2000;

      this.get("/users", (schema) => {
        return schema.users.all();
      });
      this.get("/departments", (schema) => {
        return schema.departments.all();
      });
      this.get("/roles", (schema) => {
        return schema.roles.all();
      });
      this.get("/tickets", (schema) => {
        return schema.tickets.all();
      });
      this.get("/comments", (schema) => {
        return schema.comments.all();
      });
      this.get("/tickets/comments/:id", (schema, request) => {
        let id = request.params.id;

        let result = schema.comments.where({ ticketId: id });

        return result.sort((a, b) => {
          let d1 = new Date(b.created_at);
          let d2 = new Date(a.created_at);
          return d1 < d2;
        });
      });

      this.post("/add/ticket", (schema, request) => {
        let { createdBy } = request.queryParams;

        let body = JSON.parse(request.requestBody);
        let user = schema.users.find(createdBy);
        let attr = { user: user, ticket_uuid: faker.datatype.uuid(), ...body };
        return schema.tickets.create(attr);
      });
      this.post("/add/department", (schema, request) => {
        let body = JSON.parse(request.requestBody);

        return schema.departments.create(body);
      });

      this.post("/add/ticket/comment", (schema, request) => {
        let { createdBy, ticketId } = request.queryParams;

        const created_at = Date.now();
        const update_at = Date.now();

        let body = JSON.parse(request.requestBody);
        let user = schema.users.find(createdBy);
        let ticket = schema.tickets.find(ticketId);
        if (ticket.status === "Pending") {
          ticket.update({ status: "Answered" });
        }
        let attr = {
          user: user,
          ticket: ticket,
          ...body,
          created_at: created_at,
          update_at: update_at,
        };
        return schema.comments.create(attr);
      });
      this.patch("/update/department/:depId", (schema, request) => {
        let id = request.params.depId;
        let body = JSON.parse(request.requestBody);
        let department = schema.departments.find(id);

        department.update(body);

        return { message: " successfully updated", department: department };
      });

      this.put("/update/ticket/:ticketId", (schema, request) => {
        let id = request.params.ticketId;
        let ticket = schema.tickets.find(id);
        ticket.update({ status: "Closed" });

        return ticket;
      });
      this.delete("/delete/department/:depId", (schema, request) => {
        let id = request.params.depId;
        let department = schema.departments.find(id);
        department.destroy();
        return { message: "Successfully deleted", department };
      });
    },
  });
  return server;
}

const depRandomFunction = () => {
  return Math.floor(Math.random() * mockDepartments.length);
};
const roleRandomFunction = () => {
  return Math.floor(Math.random() * mockRoles.length);
};
