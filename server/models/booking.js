
export default (sequelize, DataTypes) => {
  const Booking = sequelize.define('bookings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fBookingName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fBookingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fStartTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fEndTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    users_fId: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "bookings",
    classMethods: {
      associate: models => {
        Booking.belongsTo(models.users, {
          foreignKey: "users_fId"
        });
      }
  }});

  Booking.loadAll = (attributes = [], queryWhere = {}, ...options) =>
    new Promise(async (resolve, reject) => {
      try {
        let bookings = null;
        if (attributes.length < 1){
          bookings = await Booking.findAll({
            ...queryWhere
          });
        }
        else
          bookings = await Booking.findAll({
            attributes,
            ...queryWhere
          });
        resolve(bookings);
      } catch (err) {
        err.code = 500;
        err.msg = "DB_QUERY_ERROR";
        reject(err);
      }
    });

  Booking.add = (attributes = {}) => {
    new Promise(async (resolve, reject) => {
      try {
        const booking = await Booking.create(attributes); 
        resolve(booking.dataValues);    
      } catch (err) {
        reject(err)
      }
    });
  }

  Booking.modify = (attributes = {}, queryWhere = {}) => { 
    new Promise(async (resolve, reject) => {
      try {
        const booking = Booking.update(attributes, {...queryWhere});
        resolve(booking);    
      } catch (err) {
        reject(err)
      }
    });
  }

  return Booking;
};