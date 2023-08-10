import {
	AbstractPaymentProcessor,
	PaymentProcessorContext,
	PaymentProcessorError,
	PaymentProcessorSessionResponse,
	PaymentSessionStatus,
} from "@medusajs/medusa";

const IDENTIFIER = "MyUserPay";

class MyUserPay extends AbstractPaymentProcessor {
	static identifier = IDENTIFIER;

	constructor(container, options) {
		super(container, options);
	}

	async capturePayment(
		paymentSessionData: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		console.log("captured payment");
		return { status: "captured" };
	}

	async authorizePayment(
		paymentSessionData: Record<string, unknown>,
		context: Record<string, unknown>
	): Promise<
		| PaymentProcessorError
		| { status: PaymentSessionStatus; data: Record<string, unknown> }
	> {
		console.log("authorize payment");
		return {
			status: PaymentSessionStatus.AUTHORIZED,
			data: {
				id: "test",
			},
		};
	}

	async cancelPayment(
		paymentSessionData: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		return { id: "test" };
	}

	async initiatePayment(
		context: PaymentProcessorContext
	): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {
		return {
			session_data: context.paymentSessionData,
			update_requests: null,
		};
	}

	async deletePayment(
		paymentSessionData: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		return paymentSessionData;
	}

	async getPaymentStatus(
		paymentSessionData: Record<string, unknown>
	): Promise<PaymentSessionStatus> {
		return PaymentSessionStatus.AUTHORIZED;
	}

	async refundPayment(
		paymentSessionData: Record<string, unknown>,
		refundAmount: number
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		return { id: "test" };
	}

	async retrievePayment(
		paymentSessionData: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		return {};
	}

	async updatePayment(
		context: PaymentProcessorContext
	): Promise<void | PaymentProcessorError | PaymentProcessorSessionResponse> {
		return {
			session_data: context.paymentSessionData,
			update_requests: null,
		};
	}

	async updatePaymentData(
		sessionId: string,
		data: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		return {};
	}
}

export default MyUserPay;
