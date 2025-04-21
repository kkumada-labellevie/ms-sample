import { ThisError } from '../../../../error/this-error';
import { DeleteFromCartCommand } from './delete-from-cart.command';

/**
 * 入力用ポート
 * カートから商品を削除するというユースケースを表す
 * このインターフェイスを実装するのはドメイン層であり、アダプタ層は本インターフェイスを利用してユースケースを実行する
 */
export interface DeleteFromCartUseCase {
  deleteItem(cmd: DeleteFromCartCommand): Promise<void | ThisError>
}
