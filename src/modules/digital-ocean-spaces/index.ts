import { 
  ModuleProvider, 
  Modules
} from "@medusajs/framework/utils"
import { SpacesFileService } from "./services/spaces"

export default ModuleProvider(Modules.FILE, {
  services: [SpacesFileService],
});
