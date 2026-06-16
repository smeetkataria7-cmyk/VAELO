"use server";

import { revalidatePath } from "next/cache";
import { setProposalStatus } from "@/lib/proposals";

export async function acceptProposal(token: string) {
  await setProposalStatus(token, "accepted");
  revalidatePath(`/p/${token}`);
}

export async function declineProposal(token: string) {
  await setProposalStatus(token, "declined");
  revalidatePath(`/p/${token}`);
}
