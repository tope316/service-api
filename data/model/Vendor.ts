import { Sequelize, DataTypes, Model } from 'sequelize'
import { connection } from '../connection/Connection'

class Vendor extends Model {
    public ID!: string
    public Company_Code!: string
    public Company: string
    public Building: string
    public Street: string
    public Area: string
    public Country: string
    public Remarks: string
    public Phone: string
    public Fax: string
    public Telex: string
    public Contact: string
    public Position: string
    public Last_Txn: string
    public Last_Pay: string
    public Credit_Limit: number
    public Due_Method: string
    public Due_Day: number
    public Include: number
    public LastAccessed: Date
    public InpUser: string
    public EditUser: string
    public coy_id: number
    public mon_offset: number
    public arap_category: number
    public paycode: string
    public currency: number
    public creditdate: Date
    public orig_currency: string
    public doc_currency: string
    public warehouse_code: string
    public shipto_code: string
    public BusinessType: number
    public email: string
    public category_code: string

    // timestamps //
    public readonly InpDate!: Date
    public readonly EditDate!: Date
}

Vendor.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Company_Code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Company: {
        type: DataTypes.STRING
    },
    Building: {
        type: DataTypes.STRING
    },
    Street: {
        type: DataTypes.STRING
    },
    Area: {
        type: DataTypes.STRING
    },
    Country: {
        type: DataTypes.STRING
    },
    Remarks: {
        type: DataTypes.STRING
    },
    Phone: {
        type: DataTypes.STRING
    },
    Fax: {
        type: DataTypes.STRING
    },
    Telex: {
        type: DataTypes.STRING
    },
    Contact: {
        type: DataTypes.STRING
    },
    Position: {
        type: DataTypes.STRING
    },
    Last_Txn: {
        type: DataTypes.STRING
    },
    Last_Pay: {
        type: DataTypes.STRING
    },
    Credit_Limit: {
        type: DataTypes.DECIMAL
    },
    Due_Method: {
        type: DataTypes.STRING
    },
    Due_Day: {
        type: DataTypes.INTEGER
    },
    Include: {
        type: DataTypes.INTEGER
    },
    LastAccessed: {
        type: DataTypes.DATE
    },
    InpUser: {
        type: DataTypes.STRING
    },
    EditUser: {
        type: DataTypes.STRING
    },
    coy_id: {
        type: DataTypes.INTEGER
    },
    mon_offset: {
        type: DataTypes.INTEGER
    },
    arap_category: {
        type: DataTypes.INTEGER
    },
    paycode: {
        type: DataTypes.STRING
    },
    currency: {
        type: DataTypes.INTEGER
    },
    creditdate: {
        type: DataTypes.DATE
    },
    orig_currency: {
        type: DataTypes.STRING
    },
    doc_currency: {
        type: DataTypes.STRING
    },
    warehouse_code: {
        type: DataTypes.STRING
    },
    shipto_code: {
        type: DataTypes.STRING
    },
    BusinessType: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    category_code: {
        type: DataTypes.STRING
    }
}, {
    // Other model options go here
    tableName: "vendor",
    sequelize: connection,
    modelName: 'Vendor',
    timestamps: true,
    createdAt: 'InpDate',
    updatedAt: 'EditDate'
})

export default Vendor