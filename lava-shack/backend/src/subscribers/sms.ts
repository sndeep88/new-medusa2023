import { Customer, Logger } from "@medusajs/medusa";
import TemplateService from "services/template";
import TextgridService from "services/textgrid";

export class EmailSubcriber {
	textgridService_: TextgridService;
	templateService_: TemplateService;
	logger_: Logger;

	constructor({ textgridService, templateService, logger, eventBusService }) {
		this.textgridService_ = textgridService;
		this.templateService_ = templateService;
		this.logger_ = logger;

		eventBusService.subscribe("sms.remind-order", this.handleRemindOrder);
		eventBusService.subscribe("order.placed", this.handleOrderPlaced);
		eventBusService.subscribe("customer.created", this.handleCustomerCreated);
		eventBusService.subscribe("invite.created", this.handleUserInvite);
	}

	handleRemindOrder = async ({ order, to, type }) => {
		if (type !== "sms") return;

		console.info(`Send remind order sms: ${order.cart_id} to sms: ${to}`);

		const template = await this.templateService_.getByCode(
			"remind-order",
			"sms"
		);
		if (!template.enable) return;

		await this.textgridService_.sendRemindOrder(
			to,
			order.cart_id,
			template.code
		);
	};

	handleOrderPlaced = async ({ id }) => {
		const template = await this.templateService_.getByCode(
			"confirm-order",
			"sms"
		);
		if (!template.enable) return;

		console.info(`Send order placed sms: ${id}`);

		await this.textgridService_.sendOrderPlaced(id);
	};

	handleCustomerCreated = async (customer: Customer) => {
		const template = await this.templateService_.getByCode("sign-up", "sms");
		if (!template.enable) return;

		console.info(
			`Send customer created sms: ${customer.email || customer.first_name}`
		);

		await this.textgridService_.sendCustomerCreated(customer);
	};

	handleUserInvite = async ({ user_email, id, token }) => {
		const template = await this.templateService_.getByCode("invitation", "sms");
		if (!template.enable) return;

		console.info(`Send user invite sms: ${user_email}`);

		await this.textgridService_.sendUserInvite({
			email: user_email,
			id,
			token,
		});
	};
}

export default EmailSubcriber;
