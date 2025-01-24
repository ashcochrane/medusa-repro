import { useEffect, useState } from 'react';
import { CreateDocumentDTO, DocumentDTO } from '../../modules/document/dtos';
import { HttpTypes } from '@medusajs/framework/types';

export const useDocuments = (
  query?: Record<string, any>
): {
  data: { documents: DocumentDTO[] } | null,
  refetch: () => void;
  loading: boolean;
  error: Error | null
} => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const filterQuery = new URLSearchParams(query).toString();

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          "/admin/documents" + (filterQuery ? `?${filterQuery}` : "")
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [refetchTrigger]);

  return { data, refetch, loading, error };
}

export const useDocument = (
  documentId: string,
  query?: Record<string, any>
) : {
  data: { document: DocumentDTO }| null;
  refetch: () => void;
  loading: boolean;
  error: Error | null;
} => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const filterQuery = new URLSearchParams(query).toString();
  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `/admin/documents/${documentId}` +
            (filterQuery ? `?${filterQuery}` : "")
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [refetchTrigger]);

  return { data, refetch, loading, error };
}

export const useCreateDocument = (): {
  mutate: (data: CreateDocumentDTO) => Promise<DocumentDTO>;
  loading: boolean;
  error: Error | null;
} => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateDocumentDTO) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append each file in the FileList or a single file if it's not a FileList
      if (data.file instanceof FileList) {
        Array.from(data.file).forEach((file) => {
          formData.append("file", file);
        });
      } else if (data.file) {
        formData.append("file", data.file);
      }

      const response = await fetch("/admin/documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create document");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};


export const useDeleteDocument = (
  documentId: string
): {
  mutate: () => Promise<void>;
  loading: boolean;
  error: Error | null;
} => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/admin/documents/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};