const fs = require('fs')
const path = require('path')

//hasOne один-к-одному существует между A и B, с внешним ключом определяется в B
//belongsTo один-к-одному существует между A и B, с внешним ключом определяется в A
//belongsToMany много-ко-многим между Aи B, используя таблицу в Cкачестве распределительной таблицы, которая будет иметь внешние ключи
/*
sequelize.models.User.belongsTo(sequelize.models.Telegram)
sequelize.models.User.hasOne(sequelize.models.Alert)
sequelize.models.User.hasOne(sequelize.models.Sessions)
sequelize.models.User.hasOne(sequelize.models.Feedback)
sequelize.models.User.hasOne(sequelize.models.Child)
sequelize.models.User.belongsToMany(sequelize.models.TimeTable, {through: sequelize.models.TeacherTable})
sequelize.models.User.hasOne(sequelize.models.Trial)

sequelize.models.Child.belongsToMany(sequelize.models.TimeTable, {through: sequelize.models.ChildTable})
sequelize.models.Child.hasOne(sequelize.models.Trial)

sequelize.models.TimeTable.hasOne(sequelize.models.Trial)
sequelize.models.TimeTable.hasOne(sequelize.models.MiningTable)
sequelize.models.TimeTable.belongsToMany(sequelize.models.Course, {through: sequelize.models.CourseTable})
sequelize.models.TimeTable.belongsTo(sequelize.models.Filial)

sequelize.models.Schedule.belongsTo(sequelize.models.User)
sequelize.models.Schedule.belongsTo(sequelize.models.Task)
sequelize.models.Schedule.belongsTo(sequelize.models.TimeTable)
sequelize.models.Schedule.belongsTo(sequelize.models.Childschedule)
sequelize.models.Schedule.hasOne(sequelize.models.MiningTable)

sequelize.models.Childschedule.belongsTo(sequelize.models.Course)
sequelize.models.Childschedule.belongsTo(sequelize.models.Child)

sequelize.models.Course.belongsToMany(sequelize.models.Trial, {through: sequelize.models.Trialsequelize.models.Course})
sequelize.models.Course.hasOne(sequelize.models.Task)

sequelize.models.Gallery.belongsTo(sequelize.models.Course)
sequelize.models.Gallery.belongsTo(sequelize.models.Child)
sequelize.models.Gallery.belongsTo(sequelize.models.TimeTable)

sequelize.models.User.hasMany(ReferalParentsequelize.models.Trial, { onDelete: "cascade" })
sequelize.models.Trial.hasMany(ReferalParentsequelize.models.Trial, { onDelete: "cascade" })*/


// Один ко многим
//sequelize.models.Sessions.belongsTo(sequelize.models.User)
//sequelize.models.Schedule.belongsTo(sequelize.models.User)
module.exports = (sequelize, DataTypes) => {
  fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    require(path.join(__dirname, file))(sequelize, DataTypes)
  })
  
  sequelize.models.User.hasMany(sequelize.models.Child);
  sequelize.models.Child.belongsTo(sequelize.models.User);

  sequelize.models.User.hasMany(sequelize.models.Schedule)

  sequelize.models.Trial.belongsTo(sequelize.models.User);

  sequelize.models.User.hasMany(sequelize.models.Token);
  sequelize.models.Token.belongsTo(sequelize.models.User);

  sequelize.models.Schedule.belongsTo(sequelize.models.Childschedule)
  sequelize.models.Schedule.belongsTo(sequelize.models.Task)
  sequelize.models.Schedule.belongsTo(sequelize.models.TimeTable)
  sequelize.models.Child.belongsTo(sequelize.models.Course)
  sequelize.models.Gallery.belongsTo(sequelize.models.Course)
  sequelize.models.Gallery.belongsTo(sequelize.models.Child)
  sequelize.models.Gallery.belongsTo(sequelize.models.TimeTable)
  sequelize.models.Task.belongsTo(sequelize.models.Course)
  sequelize.models.TimeTable.belongsTo(sequelize.models.Filial)
  sequelize.models.Childschedule.belongsTo(sequelize.models.Course)
  sequelize.models.Childschedule.belongsTo(sequelize.models.Child)
  //sequelize.models.Child.belongsTo(sequelize.models.User)
  //sequelize.models.Trial.belongsTo(sequelize.models.Course)
  sequelize.models.Trial.belongsTo(sequelize.models.Child)
  //sequelize.models.Trial.belongsTo(sequelize.models.User)
  sequelize.models.Trial.belongsTo(sequelize.models.TimeTable)
  sequelize.models.Trial.hasMany(sequelize.models.ReferalParentTrial)
  sequelize.models.User.hasMany(sequelize.models.ReferalParentTrial)
  sequelize.models.ReferalParentTrial.belongsTo(sequelize.models.Trial)
  sequelize.models.ReferalParentTrial.belongsTo(sequelize.models.User)
  sequelize.models.TrialCourse.belongsTo(sequelize.models.Course)
  sequelize.models.Trial.hasMany(sequelize.models.TrialCourse)

  sequelize.models.ChildTable.belongsTo(sequelize.models.Child)
  sequelize.models.ChildTable.belongsTo(sequelize.models.TimeTable)

  sequelize.models.User.hasMany(sequelize.models.Sessions, { onDelete: "cascade" });
  sequelize.models.Child.hasMany(sequelize.models.Trial, { onDelete: "cascade" });
  //sequelize.models.Course.hasMany(sequelize.models.Trial, { onDelete: "cascade" });
  sequelize.models.User.hasMany(sequelize.models.Alert, { onDelete: "cascade" });
  sequelize.models.User.hasMany(sequelize.models.Feedback, { onDelete: "cascade" });
  sequelize.models.Child.hasMany(sequelize.models.Gallery, { onDelete: "cascade" });
  sequelize.models.Course.hasMany(sequelize.models.Gallery, { onDelete: "cascade" });
  sequelize.models.TimeTable.hasMany(sequelize.models.Gallery, { onDelete: "cascade" });
  sequelize.models.Course.hasMany(sequelize.models.Task, { onDelete: "cascade" });
  sequelize.models.Course.hasMany(sequelize.models.Child, { onDelete: "cascade" });
  sequelize.models.Course.hasMany(sequelize.models.Childschedule, { onDelete: "cascade" });
  sequelize.models.Child.hasMany(sequelize.models.Childschedule, { onDelete: "cascade" });
  sequelize.models.User.hasMany(sequelize.models.Trial, { onDelete: "cascade" });
  sequelize.models.TimeTable.hasMany(sequelize.models.Trial, { onDelete: "cascade" });
  sequelize.models.Filial.hasMany(sequelize.models.TimeTable, { onDelete: "cascade" });
  //sequelize.models.TimeTable.hasMany(sequelize.models.ChildTable, { onDelete: "cascade" });
  //sequelize.models.Child.hasMany(sequelize.models.ChildTable, { onDelete: "cascade" });

  //sequelize.models.Trial.hasMany(sequelize.models.Trialsequelize.models.Course, { onDelete: "cascade" });

  //Referal start
  //sequelize.models.User.hasMany(ReferalParentsequelize.models.Trial, { onDelete: "cascade" });
  //sequelize.models.Trial.hasMany(ReferalParentsequelize.models.Trial, { onDelete: "cascade" });
  //Referal end
  sequelize.models.Schedule.hasMany(sequelize.models.MiningTable, { onDelete: "cascade" });
  sequelize.models.TimeTable.hasMany(sequelize.models.MiningTable, { onDelete: "cascade" });
  sequelize.models.MiningTable.belongsTo(sequelize.models.Schedule)
  sequelize.models.MiningTable.belongsTo(sequelize.models.TimeTable)


  //sequelize.models.Course.hasMany(sequelize.models.Trialsequelize.models.Course, { onDelete: "cascade" });

  sequelize.models.Childschedule.hasMany(sequelize.models.Schedule, { onDelete: "cascade" });
  sequelize.models.Task.hasMany(sequelize.models.Schedule, { onDelete: "cascade" });
  sequelize.models.TimeTable.hasMany(sequelize.models.Schedule, { onDelete: "cascade" });
  sequelize.models.Schedule.belongsTo(sequelize.models.User)

  // Многие ко многим
  sequelize.models.Trial.belongsToMany(sequelize.models.Course, {through: sequelize.models.TrialCourse});
  sequelize.models.Course.belongsToMany(sequelize.models.Trial, {through: sequelize.models.TrialCourse});

  sequelize.models.Child.belongsToMany(sequelize.models.TimeTable, {through: sequelize.models.ChildTable});
  sequelize.models.TimeTable.belongsToMany(sequelize.models.Child, {through: sequelize.models.ChildTable});

  sequelize.models.User.belongsToMany(sequelize.models.TimeTable, {through: sequelize.models.TeacherTable});
  sequelize.models.TimeTable.belongsToMany(sequelize.models.User, {through: sequelize.models.TeacherTable});

  sequelize.models.Course.belongsToMany(sequelize.models.TimeTable, {through: sequelize.models.CourseTable});
  sequelize.models.TimeTable.belongsToMany(sequelize.models.Course, {through: sequelize.models.CourseTable});


  sequelize.models.TimeTable.belongsToMany(sequelize.models.Schedule, {through: sequelize.models.MiningTable});
  sequelize.models.Schedule.belongsToMany(sequelize.models.TimeTable, {through: sequelize.models.MiningTable});

  return sequelize
}