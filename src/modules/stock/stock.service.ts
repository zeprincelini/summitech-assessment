import pool from "../../postgres";
import { IStock } from "../../types";
import { customError } from "../utils";

class StockService {
  private id: string;
  private quantity: number;
  private productId: string;

  constructor(id = "", productId = "", quantity = 0) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
  }

  public async addStock(params: Partial<IStock>) {
    const query = `
        INSERT INTO stocks (product_id, quantity)
        VALUES ($1, $2)
        RETURNING id, batch_id, product_id, quantity
        `;
    const values = [params.product_id, params.quantity];
    const stock = await pool.query(query, values).catch((e) => {
      throw customError(e?.message, 500);
    });
    return stock?.rows[0];
  }

  public async findStocks(page: number, size: number) {
    const values = [];
    const conditions = [];

    if (this.productId) {
      conditions.push(`product_id = $${values.length + 1}`);
      values.push(this.productId);
    }
    if (this.quantity) {
      conditions.push(`quantity = $${values.length + 1}`);
      values.push(this.quantity);
    }

    values.push((page - 1) * size);
    values.push(size);

    const query = `
    SELECT * from stocks
    ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ``}
    OFFSET ($${values.length - 1})
    LIMIT ($${values.length})
    `;

    const stocks = await pool.query(query, values).catch((e) => {
      throw customError(e?.message, 500);
    });

    return { rows: stocks?.rows, count: stocks?.rowCount };
  }

  public async findById() {
    const query = `
    SELECT * FROM stocks
    WHERE id = ($1)`;

    const values = [this.id];

    const stock = await pool.query(query, values).catch((e) => {
      throw customError(e?.message || "Error retrieving stock", 500);
    });

    return stock?.rows[0];
  }
}

export default StockService;
