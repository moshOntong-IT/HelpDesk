import { belongsTo, hasMany, Model } from "miragejs";

export const models = {
  user: Model.extend({
    department: belongsTo(),
    role: belongsTo(),
    tickets: hasMany("ticket"),
    comments: hasMany("comment"),
  }),
  department: Model.extend({
    users: hasMany("user"),
  }),

  role: Model.extend({
    users: hasMany("user"),
  }),
  ticket: Model.extend({
    user: belongsTo(),
    comments: hasMany("comment"),
  }),
  comment: Model.extend({
    ticket: belongsTo(),
    user: belongsTo(),
  }),
};
