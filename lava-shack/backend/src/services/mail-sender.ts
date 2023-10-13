import { BaseService } from "medusa-interfaces";
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import path = require("path");
import { CartService, DiscountService } from "@medusajs/medusa";
import DiscountRepository from "@medusajs/medusa/dist/repositories/discount";
import handlebars = require("handlebars");

const host = process.env.MAIL_HOST;
const port = +(process.env.MAIL_PORT ?? "465");
const user = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;
const STORE_URL = process.env.STORE_URL;

class MailSenderService extends BaseService {
	static identifier = "mailSender";

	options_: any;
	private transporter: nodemailer.Transporter;
	private cartService_: CartService;
	private discountRepository_: typeof DiscountRepository;

	constructor(container, options) {
		super();

		this.options_ = options;

		this.transporter = nodemailer.createTransport({
			pool: true,
			host,
			port,
			auth: {
				user,
				pass: password,
			},
			secure: true,
		});

		this.cartService_ = container.cartService;
		this.discountRepository_ = container.discountRepository;
	}

	async sendMail(to: string, cartId: string) {
		const cart = await this.getCart(cartId);
		const discount = await this.getDiscountByRegion(cart.region_id);

		console.log(discount);

		const discountAmount = discount.rule.value;
		const discountType = discount.rule.type;
		const textDiscount = (() => {
			switch (discountType) {
				case "percentage":
					return `${discountAmount}%`;
				case "fixed":
					return `$${discountAmount}`;
				case "free_shipping":
					return "Free shipping";
				default:
					return `$${discountAmount}`;
			}
		})();

		const htmlStream = fs.readFileSync(
			path.join(process.cwd(), "template", "email.html")
		);

		var template = handlebars.compile(htmlStream.toString());
		var htmlToSend = template({
			textDiscount,
			discountCode: discount.code,
			url: `${STORE_URL}/${cartId}`,
			storeUrl: STORE_URL,
		});

		const mailOptions: nodemailer.SendMailOptions = {
			from: user,
			to,
			subject: "[Shopping Center] Complete your purchase",
			html: htmlToSend,
		};

		let info = await this.transporter.sendMail(mailOptions);

		// console.log("Message sent: %s", info.messageId);

		return info;
	}

	private async getCart(cartId: string) {
		return await this.cartService_.retrieve(cartId, {
			select: ["region_id"],
		});
	}

	private async getDiscountByRegion(regionId: string) {
		const discounts = await this.discountRepository_.find({
			where: { regions: { id: regionId } },
			relations: ["regions", "rule"],
			take: 1,
		});

		return discounts[0];
	}

	check() {
		console.log("MailSenderService is working");
	}

	private toBase64() {
		const image = fs.readFileSync(
			path.join(process.cwd(), "template", "gift-wrap.png")
		);
		return Buffer.from(image).toString("base64");
	}
}

export default MailSenderService;

