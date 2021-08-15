import React from "react";
import WebsiteLayout from "../components/website_layout";

export default () => <WebsiteLayout
    description="This webapp manages the digital content of the SolarSPELL device,
        an inexpensive device that provides textbooks to schools without access
        to internet or electricity. I led a team of graduate students to produce
        an app designed to handle a hundred thousand content items. It's built
        with React frontend, Django backend, and PostgreSQL database. We used
        redux along with rxjs to build a frontend architecture that easily
        handles this project's complex state. It includes OAuth client flow login
        and a permission system that differentiates students and admins."
    img_href="/content_curation.png"
    link="SolarSPELL Homepage"
    link_href="https://solarspell.org/"
    since="Summer 2021"
    title="SolarSPELL Content Curation Management"
/>
