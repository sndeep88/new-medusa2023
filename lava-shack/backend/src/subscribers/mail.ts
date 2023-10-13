import { Customer, Logger } from "@medusajs/medusa";
import MailgunService from "services/mailgun";
import TemplateService from "services/template";

export class EmailSubcriber {
	mailgunService_: MailgunService;
	templateService_: TemplateService;
	logger_: Logger;

	constructor({ mailgunService, templateService, logger, eventBusService }) {
		this.mailgunService_ = mailgunService;
		this.templateService_ = templateService;
		this.logger_ = logger;

		eventBusService.subscribe("email.remind-order", this.handleRemindOrder);
		eventBusService.subscribe("order.placed", this.handleOrderPlaced);
		eventBusService.subscribe("customer.created", this.handleCustomerCreated);
		eventBusService.subscribe("invite.created", this.handleUserInvite);
	}

	handleRemindOrder = async ({ order, to, type }) => {
		if (type !== "email") return;

		const template = await this.templateService_.getByCode(
			"remind-order",
			"email"
		);
		if (!template.enable) return;

		console.info(`Send remind order email: ${order.cart_id} to email: ${to}`);

		await this.mailgunService_.sendRemindOrderMail(
			to,
			order.cart_id,
			template.code
		);
	};

	handleOrderPlaced = async ({ id }) => {
		// if (type !== "email") return;

		const template = await this.templateService_.getByCode(
			"confirm-order",
			"email"
		);
		if (!template.enable) return;

		console.info(`Send order placed email: ${id}`);
		this.mailgunService_.sendOrderPlaced(id);
	};

	handleCustomerCreated = async (customer: Customer) => {
		// if (type !== "email") return;

		const template = await this.templateService_.getByCode("sign-up", "email");
		if (!template.enable) return;

		console.info(
			`Send customer created email: ${customer.email || customer.first_name}`
		);

		this.mailgunService_.sendCustomerCreated(customer);
	};

	handleUserInvite = async ({ user_email, id, token }) => {
		// if (type !== "email") return;

		const template = await this.templateService_.getByCode(
			"invitation",
			"email"
		);
		if (!template.enable) return;

		console.info(`Send user invite email: ${user_email}`);
		this.mailgunService_.sendUserInvite({ email: user_email, id, token });
	};
}

export default EmailSubcriber;
