import { Injectable, Inject } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { DeleteCartPort } from 'src/cart/application/port/out/delete-cart.port';
import * as schema from '../../../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CartRepository implements DeleteCartPort {
  constructor(
    @Inject('DB_DEV') private readonly drizzle: MySql2Database<typeof schema>,
  ) {}

  async delete(cart: {
    id : number;
  }): Promise<void> {
    await this.drizzle
      .delete(schema.cartItems)
      .where(eq(schema.cartItems.cartId, cart.id))
      .execute();

    await this.drizzle
      .delete(schema.carts)
      .where(eq(schema.carts.id, cart.id))
      .execute();

    console.log('Cart deleted');
  }
}
