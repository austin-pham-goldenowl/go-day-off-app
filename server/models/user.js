export default (sequelize, DataTypes) => {
  const User = sequelize.define("users",
    {
      fId: {
        primaryKey: true,
        type: DataTypes.STRING(10)
      },
      fFirstName: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      fLastName: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      fBday: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fPosition: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      fAddress: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      fPhone: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      fTeamId: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      fTypeId: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      fEmail: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      fPassword: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      fUsername: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    { freezeTableName: true, tableName: "users" });

  User.associate = models => {
    User.belongsTo(models.userPermission, {
      foreignKey: "fId",
      as: "userPermission_fId"
    });
    User.belongsTo(models.teams, { foreignKey: "fId", as: "teams_fId" });
    User.belongsTo(models.positions, {
      foreignKey: "fId",
      as: "positions_fId"
    });
  };

  User.loadAll = (params = [], queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await User.findAll({ attributes: params, queryWhere });
        resolve(users);
      } catch (err) {
        reject(err);
      }
    });

  User.modify = (attributes, queryWhere = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        const modifiedUser = await User.update(attributes, queryWhere);
        const result = {
          user: modifiedUser.get({ plain: true })
        };
        resolve(result);
      } catch (err) {
        err.code = 500;
        err.msg = "Something went wrong with database server";
        reject(err);
      }
    });

  User.add = ({ rawPwd, ...others }) =>
    new Promise(async (resolve, reject) => {
      try {
        const userEntity = { fPassword: sha256(rawPwd), ...others };
        const user = await User.create(userEntity);
        resolve(user);
      } catch (err) {
        err.code = 500;
        err.msg = "Something went wrong";
        reject(err);
      }
    });

  User.login = ({ fUsername, rawPwd }) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          where: {
            fUsername,
            fPassword: sha256(rawPwd)
          }
        });
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });

  return User;
};

/*
{
	"firstName": "Quoc Cuong",
	"lastName" : "Nguyen",
	"bday"     : "1999-10-20 12:12:12",
	"posId"    : "hGKx5",
	"address"  : "40E Ngo Duc Ke street, Ben Nghe ward, Dist. 1, HCMC",
	"phoneNum" : "0123456789",
	"teamId"   : "",
	"typeId"   : "",
	"email"    : "abc@go.com",
	"password" : "sayohyeah",
	"username" : "abc"
}
 */
/*
{ 
  fId: 'n1UCVxhBOy',
  fFirstName: 'Quoc Cuong',
  fLastName: 'Nguyen',
  fBday: '1999-10-20T05:12:12.000Z',
  fPosition: 'hGKx5',
  fAddress: '40E Ngo Duc Ke street, Ben Nghe ward, Dist. 1, HCMC',
  fPhone: '0123456789',
  fTeamId: '',
  fTypeId: '',
  fEmail: 'abc@go.com',
  fPassword:
      '2cdefdcd003aab6fc17f8b0ff4113cc8ce31f33256afd6b99bc87cf3b162d454',
  fUsername: 'abc',
  positions_fId: null,
  userPermission_fId: null,
  teams_fId: null },
*/
