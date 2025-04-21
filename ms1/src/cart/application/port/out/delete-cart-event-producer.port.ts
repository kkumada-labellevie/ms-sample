import { ThisError } from '../../../../error/this-error';
import { DeletedFromCartStateEventMessage } from './deleted-from-cart-state.event.message';

/**
 * 出力用ポート
 * アダプタが実装する
 */
export interface CartEventProducerPort {
  publish(message: DeletedFromCartStateEventMessage): Promise<void | ThisError>;
}
