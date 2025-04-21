import { Inject, Injectable } from '@nestjs/common';
import { ThisError } from '../../../../error/this-error';
import { DeleteFromCartUseCase } from '../../port/in/delete-from-cart.usecase';
import { DeleteFromCartCommand } from '../../port/in/delete-from-cart.command';
import { TemporarilyAllocateStockPort } from '../../port/out/temporarily-allocate-stock.port';
import { DeleteCartPort } from '../../port/out/delete-cart.port';
import { CartEventProducerPort } from '../../port/out/delete-cart-event-producer.port';

/**
 * 入力Port（DeleteFromCartUsecase）を実装しているサービス
 */
@Injectable()
export class DeleteFromCartService implements DeleteFromCartUseCase {
  // Interfaceを利用してDIしているので、下記の様な記述が必要となる
  public constructor(
    @Inject('StockService') private readonly stockService: TemporarilyAllocateStockPort,
    @Inject('CartRepository') private readonly cartRepository: DeleteCartPort,
    @Inject('CartEventProducer') private readonly cartEventProducer: CartEventProducerPort
  ) {}

  /**
   * Cartから商品を削除する
   * コマンドに多態性を持たせる方がコードの拡張性が高まるが、現在はそうなっていない
   * コマンドメソッドなので、成功した時は何も返さず、エラー時にはエラーオブジェクトを返す
   * @param cmd
   * @returns
   */
  public async deleteItem(cmd: DeleteFromCartCommand): Promise<void | ThisError> {
    // // Cartを生成（@TODO 現在カートに入っている商品も取得する。その際、後の整合性のためにバージョンも取得しておく）
    // const items = [];
    // // ここがカートの復元なのは、本メソッドを呼び出す段階ではカートの初期化が終わっていることをコードが保証しているため
    // // AddToCartCommandがcartCodeが空であることを許さない
    // const [cart, cartSetupError] = Cart.setup(cmd.userUuid, cmd.cartCode, items);
    // // カートの復元に失敗した場合はエラーを返す
    // if (cartSetupError) {
    //   return cartSetupError;
    // }

    // // カートに入れるための商品を生成
    // const [sku, skuInitError] = Sku.init(cmd.sku.skuCode, cmd.sku.price);
    // // 商品の生成に失敗した場合はエラーを返す
    // if (skuInitError) {
    //   return skuInitError;
    // }

    // // Cartに商品を追加
    // // @TODO 在庫引当
    // // TODO 本実装をした場合、エラーオブジェクトが返ってくる可能性がある 現段階では仮実装なので呼び出しっぱなしのままにする
    // await this.stockService.tempAllocateStock(sku.skuCode, sku.price, cmd.quantity);
    // // Cart（集約）に対して、商品を追加する
    // // この時点ではまだDBに保存しない（保存するのは集約全体）
    // const cartAddItemError = cart.addItem(sku, cmd.quantity);
    // if (cartAddItemError) {
    //   // @TODO 失敗したら在庫引当を戻す
    //   // 集約に対しての操作が失敗した場合はエラーを返す
    //   return cartAddItemError;
    // }

    // Cart全体を保存する
    // @TODO この時バージョンも確認する方が良いので、渡す様にする
    //       バージョンを確認することで、別途APIを呼び出されていた場合にカートが前の状態に戻ってしまうということを避けられる
    // @TODO 失敗したら在庫引当を戻す
    await this.cartRepository.delete({
      id: cmd.id,
    });

    // イベント自体は集約であるCartが内部的に発行しているため、それを取りだす
    // const event = cart.occurredEvents[0];
    // イベントを発行する（このイベントをどのシステムが使うかは、考慮しなくて良い）
    // await this.cartEventProducer.publish(event.message);
  }
}
