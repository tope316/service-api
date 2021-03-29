"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Connection_1 = require("../connection/Connection");
class Customer extends sequelize_1.Model {
}
Customer.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    // Other model options go here
    tableName: "customer",
    sequelize: Connection_1.connection,
    modelName: 'Customer'
});
exports.default = Customer;
//# sourceMappingURL=Customer.js.map