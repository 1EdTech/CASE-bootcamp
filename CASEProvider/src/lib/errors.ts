import { Response } from "express";

type CodeMinorField = {
  imsx_codeMinorFieldName: string;
  imsx_codeMinorFieldValue: string;
};

type CodeMinor = {
  imsx_codeMinorField: CodeMinorField[];
};

type StatusInfo = {
  imsx_codeMajor: string;
  imsx_severity: string;
  imsx_description: string;
  imsx_codeMinor?: CodeMinor;
};

export const sendError = (
  res: Response,
  statusCode: number,
  description: string,
  field?: string,
  codeMinor?: string
) => {
  const statusInfo: StatusInfo = {
    imsx_codeMajor: "failure",
    imsx_severity: "error",
    imsx_description: description,
  };

  if (codeMinor) {
    statusInfo.imsx_codeMinor = {
      imsx_codeMinorField: [
        {
          imsx_codeMinorFieldName: field || "general",
          imsx_codeMinorFieldValue: codeMinor,
        },
      ],
    };
  }

  res.status(statusCode).json(statusInfo);
};

export const errors = {
  notFound: (res: Response, message = "Unknown Object") =>
    sendError(res, 404, message, "unknownobject"),

  unauthorized: (res: Response) =>
    sendError(
      res,
      401,
      "The request was not correctly authorised",
      "unauthorisedrequest"
    ),

  forbidden: (res: Response) =>
    sendError(
      res,
      403,
      "The server refuses to take any further action",
      "forbidden"
    ),

  invalidSelection: (res: Response, field: string) =>
    sendError(
      res,
      400,
      "An invalid selection field was supplied",
      field,
      "invalid_selection_field"
    ),

  invalidQueryParameter: (res: Response, field: string) =>
    sendError(
      res,
      400,
      "An invalid query parameter was supplied",
      field,
      "invalid_query_parameter"
    ),

  serverBusy: (res: Response) =>
    sendError(
      res,
      429,
      "The server is receiving too many requests",
      "server_busy"
    ),

  internalError: (res: Response) =>
    sendError(res, 500, "Internal server error", "internal_server_error"),
};
