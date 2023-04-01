const { Sale, User, sequelize, SalesProduct } = require('../../database/models');
const validateSale = require('./validations/validateSale');

class OrderService {
    constructor() {
        this.saleModel = Sale;
        this.userModel = User;
        this.saleProductModel = SalesProduct;
    }

    async getUserId(name) {
        const userId = await this.userModel.findOne({
            attributes: ['id'],
            where: { name },
        });
        return userId.id;
    }

    async createSale(body) {
        if (validateSale(body)) return { type: 400, message: 'Bad Request' };
        const { totalPrice, deliveryAddress, deliveryNumber, sellerName, user, products } = body;

        const newSale = await sequelize.transaction(async (t) => {
            const sellerId = await this.getUserId(sellerName);
            const sale = await this.saleModel.create({
                userId: user.id,
                sellerId,
                totalPrice,
                deliveryAddress,
                deliveryNumber,
                status: 'Pendente',
            }, { transaction: t });

            const sl = products.map((e) => ({ 
                saleId: sale.id, productId: e.id, quantity: e.quantity }));
            
            await this.saleProductModel.bulkCreate(sl, { transaction: t });

            return { type: null, message: sale };
        });
        return newSale;
    }
}

module.exports = OrderService;