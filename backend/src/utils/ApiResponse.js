/**
 * Consistent success envelope for all API responses.
 * res.json(new ApiResponse(data, "message"))
 */
export class ApiResponse {
  constructor(data = null, message = "Success", meta = null) {
    this.success = true;
    this.message = message;
    this.data = data;
    if (meta) this.meta = meta;
  }
}
