import { FileTypes, ProviderUploadFileDTO } from "@medusajs/framework/types";
import { AbstractFileProviderService, MedusaError } from "@medusajs/framework/utils";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Logger } from "@medusajs/medusa";
import path from "path";
import { ulid } from "ulid";

type InjectedDependencies = {
  logger: Logger
}

interface SpacesFileServiceConfig {
  spacesUrl: string;
  bucket: string;
  endpoint: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  prefix?: string;
  cacheControl?: string;
}

export class SpacesFileService extends AbstractFileProviderService {
  static identifier = "spaces";
  protected _config: SpacesFileServiceConfig;
  protected _logger: Logger;
  protected _client: S3Client;

  constructor({ logger }: InjectedDependencies, options: SpacesFileServiceConfig) {
    super();

    if (!options.accessKeyId || !options.secretAccessKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Access key ID and secret access key are required when using access key authentication`
      );
    }

    this._config = {
      spacesUrl: options.spacesUrl,
      bucket: options.bucket,
      endpoint: options.endpoint,
      region: options.region,
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
      prefix: options.prefix ?? "",
      cacheControl: options.cacheControl ?? "public, max-age=31536000",
    };

    this._logger = logger;
    this._client = this.getClient();
  }

  protected getClient(): S3Client {
    if (!this._client) {
      this._client = new S3Client({
        endpoint: this._config.endpoint, // DigitalOcean Spaces endpoint
        region: this._config.region,
        credentials: {
          accessKeyId: this._config.accessKeyId,
          secretAccessKey: this._config.secretAccessKey,
        },
      });

      this._logger.info("DigitalOcean Spaces S3 client initialized.");
    }
    return this._client;
  }

  async upload(
    file: ProviderUploadFileDTO
  ): Promise<FileTypes.ProviderFileResultDTO> {
    if (!file) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, `No file provided`);
    }

    if (!file.filename) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, `No filename provided`);
    }

    const parsedFilename = path.parse(file.filename);
    const fileKey = `${this._config.prefix}${parsedFilename.name}-${ulid()}${parsedFilename.ext}`;

    const content = Buffer.from(file.content, "binary");

    const command = new PutObjectCommand({
      ACL: file.access === "public" ? "public-read" : "private",
      Bucket: this._config.bucket,
      Body: content,
      Key: fileKey,
      ContentType: file.mimeType,
      CacheControl: this._config.cacheControl,
      Metadata: {
        "x-amz-meta-original-filename": file.filename,
      },
    });

    try {
      await this._client.send(command);
    } catch (e) {
      this._logger.error(`Error uploading file: ${e}`);
      throw e;
    }

    return {
      url: `${this._config.spacesUrl}/${fileKey}`,
      key: fileKey,
    };
  }

  async delete(file: FileTypes.ProviderDeleteFileDTO): Promise<void> {
    const params = {
      Bucket: this._config.bucket,
      Key: file.fileKey,
    };

    try {
      await this._client.send(new DeleteObjectCommand(params));
    } catch (e) {
      this._logger.error(`Error deleting file: ${e}`);
      throw e;
    }
  }
}
