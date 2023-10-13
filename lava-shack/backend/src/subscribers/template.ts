import Template from "../models/template";
import * as _ from "lodash";
import * as fs from "fs";
import { join } from "path";

class TemplateSubcriber {
	constructor({ eventBusService }) {
		eventBusService.subscribe(
			"template.updated.email",
			this.handleEmailTemplateUpdated
		);
		eventBusService.subscribe(
			"template.updated.sms",
			this.handleSmsTemplateUpdated
		);
	}

	handleEmailTemplateUpdated({ id, title, template, subject }: Template) {
		console.log(`Email Template with id: ${id} was updated`);

		const filename = _.kebabCase(title) + ".html";

		const baseEmail = fs.readFileSync(
			join(process.cwd(), "template_default", "base-email.html")
		);

		_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
		const baseHtmlCompile = _.template(baseEmail.toString());
		const filecontent = baseHtmlCompile({
			subject,
			body: template,
		});

		fs.writeFileSync(join(process.cwd(), "template", filename), filecontent);
	}

	handleSmsTemplateUpdated({ id, title, template }: Template) {
		console.log(`Sms Template with id: ${id} was updated`);

		const filename = _.kebabCase(title) + ".txt";

		fs.writeFileSync(join(process.cwd(), "template", filename), template);
	}
}

export default TemplateSubcriber;
