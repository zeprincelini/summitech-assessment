import pool from "../../postgres";
import { IAdmin } from "../../types";
import { customError } from "../utils";

class AdminService {
  private id: string;
  private email: string;

  constructor(id = "", email = "") {
    this.id = id;
    this.email = email;
  }

  public async create(params: Partial<IAdmin>) {
    const query = `
        INSERT INTO admins (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, email, is_active, last_login
        `;
    const values = [
      params.first_name,
      params.last_name,
      params.email,
      params.password,
    ];
    const admin = await pool.query(query, values).catch((e) => {
      throw customError(e?.message, 500);
    });
    return admin?.rows[0];
  }

  public async findOne() {
    const query = `
    SELECT *
    FROM admins WHERE ${
      this.id ? `id = ($1)` : this.email ? `email = ($1)` : ``
    }
    `;

    const admin = await pool
      .query(query, [this.id || this.email])
      .catch((e) => {
        throw customError(e?.message, 500);
      });

    return admin?.rows[0];
  }

  public async update(data: {}) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    let query = `UPDATE admins SET`;

    keys.forEach((key, i) => (query += ` ${key} = $${i + 1}`));
    query += ` WHERE id = $${keys?.length + 1}`;

    await pool.query(query, [...[values, this.id]]).catch((e) => {
      throw customError(e?.message, 500);
    });
  }
}

export default AdminService;
