export declare module "@medusajs/medusa/dist/models" {
	declare interface Store {
		bannerImage: string | null;
		siteIcon: string | null;
	}

	declare interface Page {
		title: string;
		slug: string;
		content: string;
		tag_id: string;
		tag: PageTag;
	}

	declare type PageCreateInput = {
		title: string;
		content: string;
	};

	declare interface PageTag {
		name: string;
		code: string;
		pages: Page[];
	}

	declare type PageTagCreateInput = {
		name: string;
		code: string;
	};

	declare enum TemplateType {
		EMAIL = "email",
		SMS = "sms",
	}

	declare interface Template {
		title: string;
		subject: string;
		description: string;
		template: string;
		type: TemplateType;
	}
}
