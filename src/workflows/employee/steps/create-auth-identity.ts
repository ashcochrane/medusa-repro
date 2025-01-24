import { AuthIdentityDTO } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

interface StepInput {
  email: string;
}

export const createAuthIdentityStep = createStep(
  "create-auth-identity",
  async (
    input: StepInput,
    { container }
  ): Promise<StepResponse<AuthIdentityDTO, string>> => {
    const authModuleService = container.resolve(Modules.AUTH);
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    logger.log('INSIDE THE STEP')
    logger.log(input)

    const authIdentity = await authModuleService.createAuthIdentities({
      provider_identities: [{
        provider: "emailpass",
        entity_id: input.email
      }]
    });

    logger.log(authIdentity.id);
    return new StepResponse(authIdentity, authIdentity.id);
  },
  async (authIdentityId: string, { container }) => {
    const authModuleService = container.resolve(Modules.AUTH);
    await authModuleService.deleteAuthIdentities([authIdentityId]);
  }
)
