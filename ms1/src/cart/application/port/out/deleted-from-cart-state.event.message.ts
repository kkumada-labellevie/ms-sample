/**
 * Kafkaに送信するメッセージの形式
 * イベントカテゴリを明示的にしておくことで、どういった特性のメッセージなのかをはっきりさせる
 */
export interface DeletedFromCartStateEventMessage {
  type: string,
}
