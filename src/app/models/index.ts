import Project from "./Project";
import Task from "./Task";
import User from "./User";

// Many-to-Many relationship between User and Project
User.belongsToMany(Project, {
  through: "UserProjects",
  foreignKey: "userId",
  otherKey: "projectId",
});

Project.belongsToMany(User, {
  through: "UserProjects",
  foreignKey: "projectId",
  otherKey: "userId",
});

// One-to-Many relationship between Project and Task
Project.hasMany(Task, {
  foreignKey: "projectId",
  as: "tasks",
});
Task.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

// One-to-Many relationship: Project to User (creator)
Project.belongsTo(User, {
  foreignKey: "creatorId",
  as: "creator",
});

export { User, Project, Task };
