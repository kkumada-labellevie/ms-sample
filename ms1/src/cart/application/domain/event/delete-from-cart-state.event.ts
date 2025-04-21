import { DeletedFromCartStateEventMessage } from '../../port/out/deleted-from-cart-state.event.message';

/**
 * カートから商品を削除した際のイベント
 * イベントカテゴリ: 状態転送
 */
export class DeletedFromCartStateEvent {
  private constructor(
    private readonly id: number,
  ) {}

  /**
   * 名前付きコンストラクタ
   *
   * @param id
   * @returns
   */
  public static occur(
    id: number,
  ): DeletedFromCartStateEvent {
    return new DeletedFromCartStateEvent(id);
  }

  public get message(): DeletedFromCartStateEventMessage {
    return {
      type: 'DELETED_FROM_CART',
    };
  }
}
