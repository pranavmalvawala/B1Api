import { controller, httpPost } from "inversify-express-utils";
import { Link, Page } from "../apiBase/models"
import express from "express";
import { B1BaseController } from "./B1BaseController";
import { UserInterface, ChurchInterface } from "../helpers";

@controller("/churches")
export class ChurchController extends B1BaseController {

    async validateInit(churchId: string) {
        const errors = [];
        console.log(churchId);
        const pages = await this.baseRepositories.page.loadAll(churchId);
        console.log(JSON.stringify(pages));
        const links = await this.baseRepositories.link.loadAll(churchId);
        console.log(JSON.stringify(links));
        if (pages.length > 0 || links.length > 0) errors.push("Church already initialized");
        return errors;
    }

    @httpPost("/init")
    public async init(req: express.Request<{}, {}, { user: UserInterface, church: ChurchInterface }>, res: express.Response): Promise<any> {
        return this.actionWrapper(req, res, async (au) => {
            const churchId = au.churchId;
            const errors = await this.validateInit(au.churchId);
            if (errors.length > 0) return this.denyAccess(errors);
            else {
                let page: Page = { churchId: au.churchId, content: "Welcome to " + req.body.church.name, name: "Home" };
                page = await this.baseRepositories.page.save(page);

                const promises: Promise<any>[] = [];
                const links: Link[] = [];
                links.push({ churchId: au.churchId, category: "tab", text: "Home", sort: 1, icon: "fas fa-church", linkType: "page", linkData: page.id.toString() });
                links.push({ churchId: au.churchId, category: "tab", text: "Live Stream", sort: 2, icon: "fas fa-video", linkType: "stream", linkData: "" });
                links.push({ churchId: au.churchId, category: "tab", text: "Checkin", sort: 3, icon: "far fa-hand-paper", linkType: "checkin", linkData: "" });
                links.push({ churchId: au.churchId, category: "tab", text: "Give", sort: 4, icon: "fas fa-heart", linkType: "give", linkData: "" });
                links.push({ churchId: au.churchId, category: "tab", text: "Groups", sort: 5, icon: "fas fa-users", linkType: "groups", linkData: "" });
                links.push({ churchId: au.churchId, category: "tab", text: "Get in Touch", sort: 6, icon: "fas fa-comments", linkType: "connect", linkData: "" });
                links.forEach(t => promises.push(this.baseRepositories.link.save(t)));

                await Promise.all(promises);
                return {};
            }
        });
    }
}
