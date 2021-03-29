import { Sequelize, DataTypes, Model } from 'sequelize'
import { connection } from '../connection/Connection'

class Customer extends Model {
    public id!: string
    public name!: string
    public email!: string
    public mobile!: string
    public username!: string
    public password!: string
    public department!: string
    public notes: string

    // timestamps //
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Customer.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING
    }
}, {
    // Other model options go here
    tableName: "customer",
    sequelize: connection,
    modelName: 'Customer'
})

export default Customer