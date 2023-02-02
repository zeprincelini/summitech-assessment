import pool from "../../postgres";
import { IProduct } from "../../types";
import { customError } from "../utils";

class ProductService {
  private id: string;
  private name: string;
  private adminId: string;

  constructor(id = "", name = "", adminId = "") {
    this.id = id;
    this.name = name;
    this.adminId = adminId;
  }

  public async createProduct(params: Partial<IProduct>) {
    const query = `
        INSERT INTO products (name, description, admin_id)
        VALUES ($1, $2, $3)
        RETURNING id, name, description, admin_id
        `;

    const values = [params.name, params.description, params.admin_id];
    const product = await pool.query(query, values).catch((e) => {
      throw customError(e?.message || "Error creating Product", 500);
    });

    return product?.rows[0];
  }

  public async findProducts(page: number, size: number) {
    const values = [];
    const conditions = [];

    if (this.adminId) {
      conditions.push(`admin_id = $${values.length + 1}`);
      values.push(this.adminId);
    }
    if (this.name) {
      conditions.push(`name ILIKE $${values.length + 1}`);
      values.push(`%${this.name}%`);
    }

    values.push((page - 1) * size);
    values.push(size);

    const query = `
    SELECT * from products
    ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ``}
    OFFSET ($${values.length - 1})
    LIMIT ($${values.length})
    `;

    const products = await pool.query(query, values).catch((e) => {
      throw customError(e?.message, 500);
    });

    return { rows: products?.rows, count: products?.rowCount };
  }

  public async findById() {
    const query = `
    SELECT * FROM products
    WHERE id = ($1)`;

    const values = [this.id];

    const product = await pool.query(query, values).catch((e) => {
      throw customError(e?.message || "Error retrieving product", 500);
    });

    return product?.rows[0];
  }
}

export default ProductService;
