const sale = (DataTypes) => ({
  id: DataTypes.INTEGER,
  userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  sellerId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  deliveryAddress: { type: DataTypes.STRING, allowNull: false },
  deliveryNumber: { type: DataTypes.STRING, allowNull: false },
  saleDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    sale(DataTypes),
    { underscored: true, timestamps: false, tableName: 'sales' },
  );
  Sale.associate = ({ User, SalesProduct }) => {
    Sale.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    Sale.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });
    Sale.hasMany(SalesProduct, { foreignKey: 'sale_id', as: 'sale' });
  };
  return Sale;
};
