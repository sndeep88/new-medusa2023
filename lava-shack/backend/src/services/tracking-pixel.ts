import { TransactionBaseService } from "@medusajs/medusa";
import FbPixelRepository from "../repositories/fb-pixel";
import { TrackingType } from "../models/fb-pixel";

export class TrackingPixelService extends TransactionBaseService {
	protected repository_: typeof FbPixelRepository;

	constructor(container, options) {
		super(container, options);
		this.repository_ = container.fbPixelRepository;
	}

	async getAll() {
		return this.repository_.find();
	}

	async update(id: string, enabled: boolean) {
		const fbPixel = await this.repository_.findOne({
			where: { id },
		});

		if (!fbPixel) {
			throw new Error("FbPixel not found");
		}

		fbPixel.enabled = enabled;
		await this.repository_.save(fbPixel);

		return fbPixel;
	}

	async create(data: { pixel_id; type: TrackingType }) {
		const pixelDb = await this.repository_.findOne({
			where: { pixel_id: data.pixel_id, type: data.type },
		});

		if (pixelDb) {
			return new Error("Pixel already exists");
		}

		const fbPixel = this.repository_.create({
			...data,
			enabled: true,
		});

		await this.repository_.save(fbPixel);

		return fbPixel;
	}

	async retrieve() {
		const fbPixel = await this.repository_.find({
			where: { enabled: true },
		});

		return fbPixel;
	}

	async getbyId(id: string) {
		const fbPixel = await this.repository_.findOne({
			where: { id },
		});

		return fbPixel;
	}

	async getByPixelId(pixelId: string) {
		const fbPixel = await this.repository_.findOne({
			where: { pixel_id: pixelId },
		});

		return fbPixel;
	}

	async delete(id: string) {
		const fbPixel = await this.repository_.findOne({
			where: { id },
		});

		if (!fbPixel) {
			throw new Error("FbPixel not found");
		}

		await this.repository_.delete({ id });

		return id;
	}
}

export default TrackingPixelService;
