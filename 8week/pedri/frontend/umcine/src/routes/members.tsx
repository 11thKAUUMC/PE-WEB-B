import { createFileRoute } from "@tanstack/react-router";
import { MemberPage } from "../pages/member-page";

export const Route = createFileRoute("/members")({
    component: MemberPage,
});
