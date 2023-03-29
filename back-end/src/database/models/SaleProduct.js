module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  }, { underscored: true, timestamps: false, tableName: 'sales_products' });
  
  SalesProduct.associate = ({ Product, Sale }) => {
    SalesProduct.belongsToMany(Product, { foreignKey: 'product_id', as: 'product', through: SalesProduct });
    SalesProduct.belongsToMany(Sale, { foreignKey: 'sale_id', as: 'sales', through: SalesProduct });
  };
  return SalesProduct;
};