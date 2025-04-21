/**
 * コマンドのインターフェース
 * このコマンドは、カートから商品を削除するために使用される
 * コマンドはアダプタに実装される（外部からリクエストされるものであるため）
 */
export interface DeleteFromCartCommand {
  id: number;
}
