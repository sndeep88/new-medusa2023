import { CartService, OrderService } from "@medusajs/medusa";

export class PaymentSubcriber {
	_orderService: OrderService;
	_cartService: CartService;

	constructor({ cartService, orderService, eventBusService }) {
		this._cartService = cartService;
		this._orderService = orderService;

		eventBusService.subscribe("create-payment", this.handlePaymentCreated);
	}

	handlePaymentCreated = async ({ payment, type }) => {};
}

export default PaymentSubcriber;
