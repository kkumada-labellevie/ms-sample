import { Controller, Post, Delete, Body, Inject } from '@nestjs/common';
import { AddToCartCommandRequest } from '../command/add-to-cart.command.request';
import { AddToCartUseCase } from '../../../application/port/in/add-to-cart.usecase';
import { DeleteFromCartCommandRequest } from '../command/delete-from-cart.command.request';
import { DeleteFromCartUseCase } from '../../../application/port/in/delete-from-cart.usecase';
import { Cart } from 'src/cart/application/domain/model/cart.entity';

/**
 * APIのエンドポイント
 */
@Controller()
export class AddToCartController {
  // APIが実行すべきユースケースをDIする
  constructor(
    @Inject('AddToCartService') private readonly addToCartService: AddToCartUseCase,
    @Inject('DeleteFromCartService') private readonly deleteFromCartService: DeleteFromCartUseCase,
  ) {}

  @Post("add-to-Cart")
  // @TODO 本来はもっと実装が必要
  public async addToCart(@Body() request: any): Promise<void> {
    const [cmd, cmdError] = AddToCartCommandRequest.createCommand(
      request.userUuid,
      request.cartCode,
      request.sku,
      request.quantity,
    );
    // このエラーはバリデーションエラー
    if (cmdError) {
      // @TODO エラーレスポンスを返す
      return
    }

    // ユースケースを実行
    const error = await this.addToCartService.addItem(cmd);
  }

  @Delete("delete-from-cart")
  // @TODO 本来はもっと実装が必要
  public async deleteFromCart(@Body() request: any): Promise<void> {
    const [cmd, cmdError] = DeleteFromCartCommandRequest.createCommand(
      request.id,
    );
    // このエラーはバリデーションエラー
    if (cmdError) {
      // @TODO エラーレスポンスを返す
      return
    }

    // ユースケースを実行
    const error = await this.deleteFromCartService.deleteItem(cmd);
  }
  
}
